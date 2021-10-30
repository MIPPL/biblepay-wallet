import { put, select } from 'redux-saga/effects'

import AccountActions, {AccountSelectors} from '../Redux/AccountRedux'

import NetworkActions from '../Redux/NetworkRedux'

// process STARTUP actions
export function * startup (action) {

    const addresses = yield select(AccountSelectors.getAddresses)
    for(let i=0; i<addresses.length;i++){
        yield put(AccountActions.fetchAddressInfo(addresses[i].address))
        yield put(AccountActions.fetchAddressUtxo(addresses[i].address))
    }
    yield put(AccountActions.rebroadcastTx(true))

    yield put(NetworkActions.fetchNetworkStats())
}
