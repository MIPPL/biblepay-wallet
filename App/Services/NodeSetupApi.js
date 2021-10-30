import AppConfig from '../Config/AppConfig'

// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const qs = require('qs')

// our "constructor"
const create = (baseURL = AppConfig.NODESETUP_API) => {
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


  const addClient = (_email, _password, _commit) => api.get(`includes/api/basic.php?action=AddClient&firstname=&lastname=&email=${_email}&password2=${_password}&ver=${_commit}`)

  const addOrder = (_email, _password, _clientID, _billingCycle) => api.get(`includes/api/basic.php?action=AddOrder&email=${_email}&password2=${_password}&clientid=${_clientID}&billingcycle=${_billingCycle}&pid=22&domain=nodeSetup.sinovate.io&paymentmethod=sin`)

  const getInvoice = (_email, _password, _invoiceID) => api.get(`includes/api/basic.php?action=GetInvoice&email=${_email}&password2=${_password}&invoiceid=${_invoiceID}`)

  const listInvoices = (_email, _password) => api.get(`includes/api/basic.php?action=ListInvoices&email=${_email}&password2=${_password}`)

  const listNodes = (_email, _password) => api.get(`includes/api/basic.php?action=nodelist&email=${_email}&password2=${_password}`)

  const info = (_serviceid, _clientid, _email, _password) => api.get(`includes/api/nodecp.php?action=info&serviceid=${_serviceid}&clientid=${_clientid}&email=${_email}&password=${_password}`)

  const nodeinfo = (_email, _password) => api.get(`includes/api/nodecp.php?action=nodeinfo&serviceid=${_serviceid}&clientid=${_clientid}&email=${_email}&password=${_password}`)

  return {
    addClient,
    addOrder,
    getInvoice,
    listInvoices,
    listNodes,
    info,
    nodeinfo
  }
}

// let's return back our create method as the default.
export default {
  create
}
