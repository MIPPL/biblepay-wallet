import AppConfig from '../Config/AppConfig'


import { call, put, select } from 'redux-saga/effects'

import API from '../Services/BlockbookApi'

import AccountActions, { AccountSelectors } from '../Redux/AccountRedux'

import { GlobalSelectors } from '../Redux/GlobalRedux'

import AddressInfo from '../Dtos/AddressInfo.dto'

import AddressUtxo from '../Dtos/AddressUtxo.dto'

import { Navigation } from 'react-native-navigation'

export function * getAddressInfo (action) {

  const addresses = yield select(AccountSelectors.getAddresses)
  const url = yield select(GlobalSelectors.getBlockbookApi)
  const api = API.create(url)

  var zeroCounter = 0;
  for(var i=0; i<addresses.length;i++)  {
    var address = addresses[i].address;

    const response = yield call(api.getAddress, address)

    if (response.ok) {
      try {
        const addressInfo = new AddressInfo(response.data)

        if (addressInfo.transactions()==null)   {
          zeroCounter++;
        }
        else  {
          zeroCounter = 0;
        }
        
        if (zeroCounter>=6) // after 6 empty addresses, stop getting address info
          break;

        yield put(AccountActions.successFetchAddressInfo(addressInfo.address(),addressInfo.balance(),addressInfo.unconfirmedBalance(),addressInfo.transactions()))
      } catch(e) {
        console.log(e.message)
      }

    } else {  // finish on error
      break;
    }
  }

}

export function * getAddressUtxo (action) {

  const addresses = yield select(AccountSelectors.getAddresses)

  const url = yield select(GlobalSelectors.getBlockbookApi)
  const api = API.create(url)

  yield put(AccountActions.resetAddressUtxo())
  
  var zeroCounter = 0;
  for(var i=0; i<addresses.length;i++)  {
    var address = addresses[i].address;
    if (addresses[i].transactions.length==0)  {
      zeroCounter++;
    }
    else {
      zeroCounter=0;
    }
      
    if (zeroCounter>=6) // after 6 empty addresses, stop getting utxos
      break;

    console.log('!!!getAddressUtxo:' + address + ',' + addresses.length);    

    const response = yield call(api.getUtxo, address)

    if (response.ok) {
      try {
        const addressUtxo = new AddressUtxo(response.data)

      console.log('!!!getAddressUtxo SUCCESS:' + JSON.stringify(addressUtxo.data));    

        yield put(AccountActions.successFetchAddressUtxo(address,addressUtxo.data))
      } catch(e) {
        console.log('!!!getAddressUtxo FAIL:' + e.message);
        console.log(e.message)
      }

    } else {
      console.log('!!!getAddressUtxo KO:' + JSON.stringify(response));
      break;
    }
  }
}


