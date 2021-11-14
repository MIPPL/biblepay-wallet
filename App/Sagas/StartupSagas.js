import { put, select } from 'redux-saga/effects'

import AccountActions, {AccountSelectors} from '../Redux/AccountRedux'

import NetworkActions from '../Redux/NetworkRedux'

// process STARTUP actions
export function * startup (action) {

    yield put(AccountActions.fetchAddressInfo())
    yield put(AccountActions.fetchAddressUtxo())
    yield put(AccountActions.rebroadcastTx(true))

    yield put(NetworkActions.fetchPriceData())
}
