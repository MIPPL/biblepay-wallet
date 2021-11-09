import AppConfig from './../Config/AppConfig'

import { createReducer, createActions } from 'reduxsauce'

import bip39 from 'react-native-bip39'
const { HDKey } = require("wallet.ts");

import Immutable from 'seamless-immutable'

import '../../shim.js'
import * as Keychain from "react-native-keychain";

var bitcore = require('bitcore-lib');

const crypto = require('crypto');

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  generateAddressFromMnemonic: ['mnemonic', 'callback'],
  fetchAddressInfo: [],
  successFetchAddressInfo: ['address', 'balance', 'unconfirmedBalance', 'transactions'],
  fetchAddressUtxo: [],
  successFetchAddressUtxo: ['address','utxo'],
  resetAddressUtxo: null,
  resetAddresses: null,
  sendTransaction: ['destination', 'value', 'fee', 'noalerts', 'callback'],
  estimateFeeAndPromptUser: ['destination', 'value', 'callback'],
  addUnsendTx: ['signedTx'],
  resetUnsendTx: null,
  rebroadcastTx: ['sendImmediately'],
  getMaxAmount: ['callback'],
  generateNewAddresses: [ 'username', 'password','callback'],
  setDerivationPath: ['path']
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  addresses: [],
  utxo: [],
  unsendTx: [],
  derivationPath: "m/44'/"+AppConfig.BIP44Code+"'/0'/",    // default bip44
  loadingAddressInfo: false,
  loadingUtxoInfo: false
})

/* ------------- Selectors ------------- */

export const AccountSelectors = {
  getAddresses: state => state.account.addresses,
  getDerivationPath: state => state.account.derivationPath,
  getTransactions: state => {
    let transactions = []
        
    state.account.unsendTx.forEach(uTx=>{
      let txObj = {
        amount: uTx.amount,
        to: uTx.to,
        txid: '-',
        confirmations: -1,
        blockTime: uTx.blockTime,
        broadcasted: false
      }
      transactions.push(txObj)
    })

    state.account.addresses.forEach(add=>{
      if(add.transactions)  {
        add.transactions.forEach(tx => {
        var to = ''
        to = tx.vout[0].addresses[0];
        
        let txObj = {
          amount: 0,
          to: to,
          txid: tx.txid,
          confirmations: tx.confirmations,
          blockTime: tx.blockTime,
          from: '',
          broadcasted: true
        }

        tx.vin.forEach(vin =>{
          if(vin.addresses&&vin.addresses.includes(add.address)){
            txObj.from = add.address
            txObj.amount-=parseInt(vin.value)
          }

        })
        tx.vout.forEach(vout =>{
          if(vout.addresses&&vout.addresses.includes(add.address)){
            txObj.amount+=parseInt(vout.value)
          }
        })
        transactions.push(txObj)
      })
    }
    })

    // sort transactions coming from different addresses
    transactions.sort((a, b) => parseFloat(a.confirmations) - parseFloat(b.confirmations));
    
    return transactions
  },
  getBalance: state => {

    let balance = 0
    state.account.addresses.forEach(add=>{
      balance+=add.balance
    })
    return balance
  },
  getUtxo: state => {
    let utxos = []
    
    if (state.account.addresses.length == 0) {
      return []
    }
    
    state.account.utxo.forEach(ut=>{
      let address = state.account.addresses.find(add=>{return add.address===ut.address})
      let transaction = address.transactions.find(tx=>{return tx.txid===ut.txid})

      if(transaction) {
        let vout = transaction.vout.find(v => {
          return v.n === ut.vout
        })

        let utx = {
          txId: ut.txid,
          outputIndex: ut.vout,
          address: ut.address,
          script: vout.hex,
          satoshis: parseInt(ut.value)
        }

        utxos.push(utx)
      }

    })
    //console.log('getUtxos account:' + state.account.utxo.length + ', ret: '+utxos.length);
    return utxos
  },
  getUnsendTx: state => state.account.unsendTx,
  getAccountAddress: state => {
    return state.account.addresses.find( (item, index) => { return item.transactions && item.transactions.length==0 && (index%2)==0; })
  },
  getChangeAddress: state =>  {
    return state.account.addresses.find( (item, index) => { return item.transactions && item.transactions.length==0 && (index%2)==1; })
  },
  isAddressPoolEmpty: state =>  {
    var lastNTx = state.account.addresses.slice(-4);
    var hasTx = (add) => add.transactions.length > 0;
    return lastNTx.some(hasTx);
  },
  getLoadingAddressInfo: state => state.account.loadingAddressInfo,
  getLoadingUtxoInfo: state => state.account.loadingUtxoInfo
}

/* ------------- Reducers ------------- */


function encrypt(text, key, iv) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex'), key:key.toString('hex') };
}

function decrypt(text) {
      let iv = Buffer.from(text.iv, 'hex');
      let encryptedText = Buffer.from(text.encryptedData, 'hex');
      let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(text.key, 'hex'), iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    }

// return array of {addresses,privkeys)
function generateHDAddresses( mnemonic, derivationPath, startIndex, numAddresses, encryptedMnemonic ) {

    var hdAddresses = [];

    if (startIndex==0 && encryptedMnemonic=='') {
      throw new Error('AccountRedux::generateHDAddresses: must provide encryptedMnemonic when startIndex is 0.')
    }

    var seed = bip39.mnemonicToSeed(mnemonic);
    const masterKey = HDKey.parseMasterSeed(seed);
    const extAccountPrivKey = masterKey.derive(derivationPath+"0").extendedPrivateKey;
    const extChangePrivKey = masterKey.derive(derivationPath+"1").extendedPrivateKey;
    const childAccountKey = HDKey.parseExtendedKey(extAccountPrivKey);
    const childChangeKey = HDKey.parseExtendedKey(extChangePrivKey);

    console.log('generateHDAddresses' + derivationPath + ': ' + startIndex + '-' + (startIndex+numAddresses-1));
    for (var i=startIndex; i<startIndex+numAddresses; i++ ) {
      const hdAccountKeyPair = childAccountKey.derive(i.toString());
      const hdChangeKeyPair = childChangeKey.derive(i.toString());
      
      var hdAccountPubKey = new bitcore.PublicKey(hdAccountKeyPair.publicKey);
      var hdChangePubKey = new bitcore.PublicKey(hdChangeKeyPair.publicKey);
      
      const hdAccountAddress = new bitcore.Address(hdAccountPubKey)
      const hdChangeAddress = new bitcore.Address(hdChangePubKey)

      var encryptedAccountPrivKey = ''
      if (encryptedMnemonic!='' && i==0)  {
        encryptedAccountPrivKey = encryptedMnemonic;
      }

console.log('@@ NEW Account address ['+i+']: ' + hdAccountAddress.toString());
console.log('@@ NEW Change address ['+i+']: ' + hdChangeAddress.toString());

      hdAddresses.push( { address: hdAccountAddress.toString(), encryptedPrivKey:encryptedAccountPrivKey, balance: 0, transactions: [], index: i} );
      hdAddresses.push( { address: hdChangeAddress.toString() , encryptedPrivKey:'', balance: 0, transactions: [], index: i} );
    }
    return hdAddresses;
}

export const genAddFromMn =  (state = INITIAL_STATE, action) => {
  const { mnemonic, callback } = action

  if(mnemonic.split(' ').length===12){
    // address structure: 
    //  0..2n (even) = HD wallet account addresses
    //  1..2n+1 (odd) = HD wallet change addresses
    var allAddresses = [];

    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    // HD addresses
    const encryptedMnemonic = encrypt(mnemonic, key, iv)
    var allAddresses = generateHDAddresses( mnemonic, state.derivationPath, 0, 20, encryptedMnemonic.encryptedData);
    // store encrypted seed data (to generate more addresses to the pool if required later)
    Keychain.setInternetCredentials(encryptedMnemonic.encryptedData,encryptedMnemonic.iv,encryptedMnemonic.key)

    callback(false)
    return state.merge({
      addresses: allAddresses
    })
  } else {
    callback(true)
    return state
  }
}

export const fetchAddInfo = (state = INITIAL_STATE, action) => {
  console.log('@@fetchAddInfo: ');
  
  return state.merge({
      loadingAddressInfo: true
    })
}

export const successFetchAddInfo = (state = INITIAL_STATE, action) => {
  const { address, balance, unconfirmedBalance, transactions } = action

  var loading = ( address == state.addresses[state.addresses.length-1].address ) ? false : true;
  console.log('@@successFetchAddInfo: ' + address + ': ' + state.addresses.findIndex( (item, index) => { return item.address == address; } ) + ': ' + loading);
  if(transactions){
    console.log('@@successFetchAddInfo txs: ' + transactions.length);
    let addresses = []
    state.addresses.forEach(add=>{

      if(add.address===address){
        let newAddressObj = JSON.parse(JSON.stringify(add))

        newAddressObj.balance = parseInt(balance) + parseInt(unconfirmedBalance)
        newAddressObj.transactions = transactions
        addresses.push(newAddressObj)
      }else{
        addresses.push(add)
      }

    })

    return state.merge({
      addresses,
      loadingAddressInfo: loading
    })
  }else{
    return state.merge({
      loadingAddressInfo: loading
    })
  }

}

export const fetchAddUtxo = (state = INITIAL_STATE, action) => {
  console.log('@@fetchAddUtxo: ');

  return state.merge({
    loadingUtxoInfo: true
  })
}

export const successFetchAddUtxo = (state = INITIAL_STATE, action) => {
  const { address, utxo } = action

  utxo.forEach(ut=>{
    ut.address=address
  })

  var utxoIds = new Set(state.utxo.map(u => u.txid + ':' + u.vout));
  var merged = [...state.utxo, ...utxo.filter(u => !utxoIds.has(u.txid + ':' + u.vout))];

  var loading = ( address == state.addresses[state.addresses.length-1].address ) ? false : true;
  console.log('@@successFetchUtxoInfo: ' + address + ': ' + loading);
  
  return state.merge({
    utxo: merged,
    loadingUtxoInfo: loading
  })

}

export const sendTransaction = (state = INITIAL_STATE, action) => {
  return state
}

export const estimateFee = (state = INITIAL_STATE, action) => {
  return state
}

export const setDerivationPath = (state = INITIAL_STATE, action) => {
  const { path } = action
  return state.merge({
    derivationPath: path
  })
}

export const addUnsend = (state = INITIAL_STATE, action) => {
  const {signedTx} = action

  return state.merge({
    unsendTx: [...state.unsendTx, signedTx]
  })
}

export const resetUnsend = (state = INITIAL_STATE, action) => {

  return state.merge({
    unsendTx: []
  })
}

export const rebroadcast = (state = INITIAL_STATE, action) => {
  return state
}

export const getMaxAmount = (state = INITIAL_STATE, action) => {
  return state
}

export const generateNewAddr = (state = INITIAL_STATE, action) => {
  const { username, password, callback } = action

  try {
    var hdAddresses = [];
    var decryptedMnemonic = decrypt({encryptedData:state.addresses[0].encryptedPrivKey, iv: username, key: password})
    var start = (state.addresses.length)/2;
    hdAddresses = generateHDAddresses( decryptedMnemonic.normalize('NFKD'), state.derivationPath, start, 20, '');
    callback(false)
  } 
  catch(e){
    console.log(e.message)
    callback(true)
    return state
  }
  return state.merge({
    addresses: [...state.addresses, ...hdAddresses]
  })
}

export const resetAddresses = (state = INITIAL_STATE, action) => {

  return state.merge({
    addresses: [ ]
  })
}

export const resetAddUtxo = (state = INITIAL_STATE, action) => {

  return state.merge({
    utxo: []
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GENERATE_ADDRESS_FROM_MNEMONIC]: genAddFromMn,
  [Types.FETCH_ADDRESS_INFO]: fetchAddInfo,
  [Types.SUCCESS_FETCH_ADDRESS_INFO]: successFetchAddInfo,
  [Types.FETCH_ADDRESS_UTXO]: fetchAddUtxo,
  [Types.SUCCESS_FETCH_ADDRESS_UTXO]: successFetchAddUtxo,
  [Types.RESET_ADDRESSES]: resetAddresses,
  [Types.RESET_ADDRESS_UTXO]: resetAddUtxo,
  [Types.SEND_TRANSACTION]: sendTransaction,
  [Types.ESTIMATE_FEE_AND_PROMPT_USER]: estimateFee,
  [Types.ADD_UNSEND_TX]: addUnsend,
  [Types.RESET_UNSEND_TX]: resetUnsend,
  [Types.REBROADCAST_TX]: rebroadcast,
  [Types.GET_MAX_AMOUNT]: getMaxAmount,
  [Types.GENERATE_NEW_ADDRESSES]: generateNewAddr,
  [Types.SET_DERIVATION_PATH]: setDerivationPath
})
