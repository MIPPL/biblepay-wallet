import AppConfig from './../Config/AppConfig'

// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const qs = require('qs')

// our "constructor"
const create = (baseURL = AppConfig.EXPLORER_API, token = null) => {
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

  const getNetworkStats = () => api.get(`summary.php`)
  const getPriceData = (_currency, _reference) => api.get(`Server?action=MOBILE_API`)

  return {
    getNetworkStats,
    getPriceData
  }
}

// let's return back our create method as the default.
export default {
  create
}
