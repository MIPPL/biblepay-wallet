import AppConfig from './../Config/AppConfig'

import { createReducer, createActions } from 'reduxsauce'

import Immutable from 'seamless-immutable'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setBlockbookApi: ['api'],
  setExplorerApi: ['api'],
  setNodeSetupApi: ['api'],
  setInfinityApi: ['api'],
  setUseLightTheme: ['flag'],
  setUseTestnet: ['flag'],
  setLanguage: ['lang']
})

export const GlobalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  blockbookApi: AppConfig.BLOCKBOOK_API,
  explorerApi: AppConfig.EXPLORER_API,
  nodeSetupApi: AppConfig.NODESETUP_API,
  infinityApi: AppConfig.INFNODE_API,
  useLightTheme: true,
  useTestnet: false,
  language: ''
})

/* ------------- Selectors ------------- */

export const GlobalSelectors = {
  getBlockbookApi: state => state.global.blockbookApi,
  getExplorerApi: state => state.global.explorerApi,
  getNodeSetupApi: state => state.global.nodeSetupApi,
  getInfinityApi: state => state.global.infinityApi,
  getUseLightTheme: state => state.global.useLightTheme,
  getUseTestnet: state => state.global.useTestnet,
  getLanguage: state => state.global.language
}

/* ------------- Reducers ------------- */


export const setBlockbookApi = (state = INITIAL_STATE, action) => {
  const { api } = action

  return state.merge({
    blockbookApi: api
    })
}

export const setExplorerApi = (state = INITIAL_STATE, action) => {
  const { api } = action

  return state.merge({
    explorerApi: api
  })
}

export const setNodeSetupApi = (state = INITIAL_STATE, action) => {
  const { api } = action

  return state.merge({
    nodeSetupApi: api
  })
}

export const setInfinityApi = (state = INITIAL_STATE, action) => {
  const { api } = action

  return state.merge({
    infinityApi: api
  })
}

export const setTheme = (state = INITIAL_STATE, action) => {
  const { flag } = action
  return state.merge({
    useLightTheme: flag
  })
}

export const setLanguage = (state = INITIAL_STATE, action) => {
  const { lang } = action
  return state.merge({
    language: lang
  })
}

export const setTestnet = (state = INITIAL_STATE, action) => {
  const { flag } = action

  var _blockbookApi = (flag)?AppConfig.BLOCKBOOK_API_TESTNET:AppConfig.BLOCKBOOK_API;
  var _explorerApi = (flag)?AppConfig.EXPLORER_API:AppConfig.EXPLORER_API;
  var _nodeSetupApi = (flag)?AppConfig.NODESETUP_API_TESTNET:AppConfig.NODESETUP_API;

  return state.merge({
    blockbookApi: _blockbookApi,
    explorerApi: _explorerApi,
    nodeSetupApi: _nodeSetupApi,  
    useTestnet: flag
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_BLOCKBOOK_API]: setBlockbookApi,
  [Types.SET_EXPLORER_API]: setExplorerApi,
  [Types.SET_NODE_SETUP_API]: setNodeSetupApi,
  [Types.SET_INFINITY_API]: setInfinityApi,
  [Types.SET_USE_LIGHT_THEME]: setTheme,
  [Types.SET_USE_TESTNET]: setTestnet,
  [Types.SET_LANGUAGE]: setLanguage
})
