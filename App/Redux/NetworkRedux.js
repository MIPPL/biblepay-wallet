import AppConfig from './../Config/AppConfig'

import { createReducer, createActions } from 'reduxsauce'

import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchNetworkStats: null,
  setNetworkStats: ['stats'],
  fetchPriceData: null,
  setPriceData: ['data'],

})

export const NetworkTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  stats: {},
  priceData: { BBPUSD: 0.0, BTCUSD: 0.0, BBPBTC: 0.0},
})

/* ------------- Selectors ------------- */

export const NetworkSelectors = {
  getStats: state => state.network.stats,
  getPriceData: state => state.network.priceData,
}

/* ------------- Reducers ------------- */


export const setNetworkStats = (state = INITIAL_STATE, action) => {
  const { stats } = action

  return state.merge({
    stats
  })
}

export const setPriceData = (state = INITIAL_STATE, action) => {
  const { data } = action

  return state.merge({
    priceData: data
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_NETWORK_STATS]: setNetworkStats,
  [Types.SET_PRICE_DATA]: setPriceData,
})
