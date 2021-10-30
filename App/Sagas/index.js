import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'

import { AccountTypes } from '../Redux/AccountRedux'

import { NetworkTypes } from '../Redux/NetworkRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'

import { getAddressInfo, getAddressUtxo } from './AddressSagas'

import { sendTransaction, estimateFee, rebroadcastTx, getMaxAmount, sendBurnTransaction } from './TransactionSagas'

import { getNetworkStats } from './NetworkSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AccountTypes.FETCH_ADDRESS_INFO, getAddressInfo),
    takeLatest(AccountTypes.FETCH_ADDRESS_UTXO, getAddressUtxo),
    takeLatest(AccountTypes.SEND_TRANSACTION, sendTransaction),
    takeLatest(AccountTypes.SEND_BURN_TRANSACTION, sendBurnTransaction),
    takeLatest(AccountTypes.ESTIMATE_FEE_AND_PROMPT_USER, estimateFee),
    takeLatest(AccountTypes.GET_MAX_AMOUNT, getMaxAmount),
    takeLatest(AccountTypes.REBROADCAST_TX, rebroadcastTx),
    takeLatest(NetworkTypes.FETCH_NETWORK_STATS, getNetworkStats),
  ])
}
