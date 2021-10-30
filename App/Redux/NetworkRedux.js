import AppConfig from './../Config/AppConfig'

import { createReducer, createActions } from 'reduxsauce'

import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchNetworkStats: null,
  setNetworkStats: ['stats'],

})

export const NetworkTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  stats: {}
})

/* ------------- Selectors ------------- */

export const NetworkSelectors = {
  getStats: state => state.network.stats,
}

/* ------------- Reducers ------------- */


export const setNetworkStats = (state = INITIAL_STATE, action) => {
  const { stats } = action

  return state.merge({
    stats
  })
}



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_NETWORK_STATS]: setNetworkStats,
})
