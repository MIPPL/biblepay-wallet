
import { call, put, select } from 'redux-saga/effects'

import API from '../Services/ExplorerApi'

import NetworkActions from '../Redux/NetworkRedux'

import NetworkStats from '../Dtos/NetworkStats.dto'

import {GlobalSelectors} from '../Redux/GlobalRedux';


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


