import AppConfig from '../Config/AppConfig'

// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const qs = require('qs')

// our "constructor"
const create = (baseURL = AppConfig.INFNODE_API) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
    },
    timeout: 15000,
    paramsSerializer: function (params) {
      return qs.stringify(params)
    }
  })

  const showInfos = (_addresses) => api.get('show-infos', { find : _addresses} );

  return {
    showInfos
  }
}

// let's return back our create method as the default.
export default {
  create
}
