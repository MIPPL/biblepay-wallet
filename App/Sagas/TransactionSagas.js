import AppConfig from '../Config/AppConfig'

import { Alert } from 'react-native'

import { call, put, select } from 'redux-saga/effects'

import API from '../Services/BlockbookApi'

import AccountActions, { AccountSelectors } from '../Redux/AccountRedux'

import { GlobalSelectors } from '../Redux/GlobalRedux'

import longRep from '../Helpers/longRepresentation'

import SendTx from '../Dtos/SendTx.dto'

import * as Keychain from "react-native-keychain";

import normRep from '../Helpers/normalRepresentation'

import '../../shim.js'
let bitcore = require('bitcore-lib')
import bip39 from 'react-native-bip39'
const { HDKey } = require("wallet.ts");

const crypto = require('crypto');

import I18n from '../I18n'

const showError = (error) => {
  Alert.alert(
      I18n.t('error'),
      error,
      [
        {text: I18n.t('dismiss')},
      ],
      {cancelable: true},
  )
}

export function * estimateFee (action) {
  const { destination, value, callback } = action

  const allUtxos = yield select(AccountSelectors.getUtxo)

  const unsendTx = yield select(AccountSelectors.getUnsendTx)

  allUtxos.sort((a,b)=>{return parseInt(a.satoshis)-parseInt(b.satoshis)})

  const addresses = yield select(AccountSelectors.getAddresses)

  let amount = longRep(parseFloat(value))

  if (unsendTx.length) { showError(I18n.t('alreadyNonBroadcast'));return false;}
  if (amount > addresses[0].balance) { showError(I18n.t('insufFunds'));return false;}
  if (amount <= longRep(0.01)) { showError(I18n.t('amountTooLittle'));return false;}
  if (!bitcore.Address.isValid(destination, bitcore.Networks.livenet, bitcore.Address.PayToPublicKeyHash)
      && !bitcore.Address.isValid(destination, bitcore.Networks.livenet, bitcore.Address.PayToScriptHash))
  { showError(I18n.t('addressInvalid'));return false;}



  let utxos = []

  const changeAdd = addresses[0].address

  let sumAmounts=0


  allUtxos.forEach(utxo=>{

    if(sumAmounts<amount){
      sumAmounts+=parseInt(utxo.satoshis)
      utxos.push(utxo)
    }

  })

  var transaction = new bitcore.Transaction()
      .from(utxos)
      .to(destination, amount)
      .feePerKb(100000000)
      .change(changeAdd)

  var fee = parseInt(transaction.getFee())

  if (fee<AppConfig.MIN_RELAY_FEE) {
    fee = AppConfig.MIN_RELAY_FEE
  }
  
  if(fee+amount>addresses[0].balance){
    showError(I18n.t('exceedsBalance', {fee: normRep(fee), ticker:AppConfig.coinTicker}))
    return false
  }

  Alert.alert(
      I18n.t('send'),
      I18n.t('feeWillBe', {fee: normRep(fee), ticker:AppConfig.coinTicker})+I18n.t('wantProceed'),
      [
        {text: I18n.t('no'), onPress: () => callback(false)},
        {
          text: I18n.t('yes'),
          onPress: () => callback(fee),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      )
}

export function * getMaxAmount (action) {
  const { callback } = action

  const allUtxos = yield select(AccountSelectors.getUtxo)

  const addresses = yield select(AccountSelectors.getAddresses)

  let utxos = []

  let sumAmounts=0

  const changeAdd = addresses[0].address

  allUtxos.forEach(utxo=>{
      sumAmounts+=parseInt(utxo.satoshis)
      utxos.push(utxo)
  })

  var transaction = new bitcore.Transaction()
      .from(utxos)
      .to(changeAdd, sumAmounts)
      .feePerKb(10000000)
      .change(changeAdd)

  var fee = parseInt(transaction.getFee())
  if (fee<AppConfig.MIN_RELAY_FEE) {
    fee = AppConfig.MIN_RELAY_FEE
  }

  const maxAmount = sumAmounts-fee

  callback(maxAmount)


}

export function * sendTransaction (action) {

  const { destination, value, fee, noalerts, callback } = action
  const allUtxos = yield select(AccountSelectors.getUtxo)
  const derivationPath = yield select(AccountSelectors.getDerivationPath)
  allUtxos.sort((a,b)=>{return parseInt(a.satoshis)-parseInt(b.satoshis)})

  var realFee = (fee>0)?fee:AppConfig.MIN_RELAY_FEE;

  const addresses = yield select(AccountSelectors.getAddresses)
  let amount = longRep(parseFloat(value))
  let utxos = []
  let privateKeys = [];
  let loadedKeys = [];
  let sumAmounts=0
  var decryptedMnemonic = '';

  const credsHD = yield Keychain.getInternetCredentials(addresses[0].encryptedPrivKey)
  decryptedMnemonic = decrypt({encryptedData:addresses[0].encryptedPrivKey, iv: credsHD.username, key: credsHD.password})
  
  allUtxos.forEach(utxo=>{
    //console.log('sendTransaction try utxo ' + utxo.txId + '; address='+utxo.address+', amount='+utxo.satoshis + ' (sum='+sumAmounts+', required='+amount+') allUtxos len='+allUtxos.length );
    if(sumAmounts<(amount+realFee)){
      sumAmounts+=parseInt(utxo.satoshis)

      if (utxo.address!=addresses[0].address) {
        var index = addresses.findIndex( (addrObj) => addrObj.address === utxo.address ); 
        if (index!=-1 && typeof loadedKeys[index] === 'undefined')  {
          var privKey = getPrivateKeyForHDAddress(decryptedMnemonic, (index-1)/2, false, derivationPath );
          privateKeys.push( new bitcore.PrivateKey( privKey ) )
          loadedKeys[index] = true;
          //console.log('sendTransaction add HD priv: '+ privKey);
        }
      }
      utxos.push(utxo)
    }
  })

  const changeAdd = addresses[0].address

  const creds = yield Keychain.getInternetCredentials(addresses[0].encryptedPrivKey)

  var decryptedPrivateKey = decrypt({encryptedData:addresses[0].encryptedPrivKey, iv: creds.username, key: creds.password})
  privateKeys.push( new bitcore.PrivateKey(decryptedPrivateKey) );

  try {
    //SIN fee change 100000 -> 10000000

    var transaction = new bitcore.Transaction()
        .from(utxos)
        .to(destination, amount)
        .fee(realFee)
        .change(changeAdd)

      let signedTx = transaction.sign(privateKeys)
      //console.log('sendTransaction SIGN :'+ signedTx);
      const url = yield select(GlobalSelectors.getBlockbookApi)

      const api = API.create(url)

      const response = yield call(api.sendTransaction, signedTx)

      if (response.ok) {
        const txData = new SendTx(response.data)
        yield new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 5000);
        })
        callback(transaction.hash)
        yield put(AccountActions.fetchAddressUtxo())
        yield put(AccountActions.fetchAddressInfo())
        if (!noalerts)  {
          Alert.alert(
              I18n.t('success'),
              I18n.t('txSuccess'),
              [
                {
                  text: I18n.t('dismiss'),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
          )
        }
        else    {
          console.log('sendTransaction SUCCESS: '+ transaction.hash);
        }

      } else {
        callback('')

        if(response.problem==='TIMEOUT_ERROR'||response.problem==='CONNECTION_ERROR'||response.problem==='NETWORK_ERROR'){
          yield put(AccountActions.addUnsendTx({hex: signedTx.toString('hex'),blockTime: new Date().getTime()/1000, amount: -(amount+transaction.getFee()), to: destination}))

          if (!noalerts)  {
            Alert.alert(
                I18n.t('info'),
                I18n.t('noInternet'),
                [
                  {text: I18n.t('dismiss')},
                ],
                {cancelable: false},
            )
          }
          else  {
            console.log('sendTransaction ERROR: connection error');
          }

          yield put(AccountActions.rebroadcastTx())

        }else{
          showError(I18n.t('unexpectedError'))
          console.log('sendTransaction ERROR: '+ I18n.t('unexpectedError'));
        }

      }

  } catch(e) {
    callback('')
    showError(I18n.t('unexpectedError') + ' '+ + e.message)
    console.log('sendTransaction ERROR: '+ I18n.t('unexpectedError'));
  }

/*

*/
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(text.key, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// return: priv key as raw hex string
function getPrivateKeyForHDAddress(mnemonic, index, change, derivationPath)  {

  try {
    
    if (index==-1)  {
      return I18n.t('errorGettingAddressIndex');  
    }
  
    var derivationPath = derivationPath + ((change)?"1":"0");
    var seed = bip39.mnemonicToSeed(mnemonic);
    const masterKey = HDKey.parseMasterSeed(seed);
    const extPrivKey = masterKey.derive(derivationPath).extendedPrivateKey;
    const childKey = HDKey.parseExtendedKey(extPrivKey);

    const hdKeyPair = childKey.derive(index.toString());    
    return hdKeyPair.privateKey.toString('hex');    
  }
  catch(e)  {
    return I18n.t('errorGettingPrivKey');
  }
}

export function * rebroadcastTx (action) {
  const {sendImmediately} = action

  const unsendTxs = yield select(AccountSelectors.getUnsendTx)

  if(unsendTxs.length) {

    if(!sendImmediately)
  yield new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 60000);
  })

  const addresses = yield select(AccountSelectors.getAddresses)

  const address = addresses[0].address

    const url = yield select(GlobalSelectors.getBlockbookApi)

    const api = API.create(url)

    const response = yield call(api.sendTransaction, unsendTxs[0].hex)

    try {

      if (response.ok) {
        const txData = new SendTx(response.data)
        yield new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 5000);
        })
        yield put(AccountActions.fetchAddressUtxo())
        yield put(AccountActions.fetchAddressInfo())
        yield put(AccountActions.resetUnsendTx())


      } else {
        if (response.problem === 'TIMEOUT_ERROR' || response.problem === 'CONNECTION_ERROR' || response.problem === 'NETWORK_ERROR') {
          yield put(AccountActions.rebroadcastTx())
        } else {
          yield put(AccountActions.resetUnsendTx())
        }
      }


    } catch (e) {
      yield put(AccountActions.rebroadcastTx())
    }

  }
}


