import AppConfig from './../Config/AppConfig'

// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const qs = require('qs')

// our "constructor"
const create = (baseURL = AppConfig.BLOCKBOOK_API) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
    },
    timeout: 15000,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })


  const getAddress = (_address) => api.get(`address/${_address}?details=txs&pageSize=100`)
  const getUtxo = (_address) => api.get(`utxo/${_address}?confirmed=false`)
  const sendTransaction = (_hex) => api.get(`sendtx/${_hex}`)
  const getXpub = (_xpub) => api.get(`xpub/${_xpub}`)

  return {
    getAddress,
    getUtxo,
    sendTransaction,
    getXpub
  }
}

// let's return back our create method as the default.
export default {
  create
}
