
import { call, put, select } from 'redux-saga/effects'

import API from '../Services/ExplorerApi'

import NetworkActions, { NetworkSelectors } from '../Redux/NetworkRedux'

import NetworkStats from '../Dtos/NetworkStats.dto'
import PriceData from '../Dtos/PriceData.dto'

import {GlobalSelectors} from '../Redux/GlobalRedux';
import { AccountSelectors } from '../Redux/AccountRedux';


export function * getNetworkStats (action) {

  const url = yield select(GlobalSelectors.getExplorerApi)
  const api = API.create(url)
  
  const response = yield call(api.getNetworkStats)
  if (response.ok) {
    try {
      const stats = new NetworkStats(response.data)
      yield put(NetworkActions.setNetworkStats(stats.data.data[0]))
    } catch(e) {
      console.log(e.message)
    }

  } else {
    // if any error happens close the modal

  }

}

export function * getPriceData (action) {
  const { } = action

  const url = yield select(GlobalSelectors.getExplorerApi)
  const api = API.create(url)
  
  const response = yield call(api.getPriceData)
  if (response.ok) {
    try {
      const price = new PriceData(response.data)
      console.log('getPriceData ' + JSON.stringify(price.data))
      yield put(NetworkActions.setPriceData(price.data))
    } catch(e) {
      console.log('EX price ' +e.message)
    }

  } else {
    // if any error happens close the modal
    console.log('ERROR price ' + JSON.stringify(response))
  }
}

