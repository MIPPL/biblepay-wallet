export default (query = '') => {

  let queryParams = {}

  if(query.split('?').length === 2) {
    const cleanedQuery = query.split('?')[1]
    const queryParamsArr = cleanedQuery.split('&')

    queryParamsArr.forEach(param => {
      if(param.split('=').length === 2) {
        const value = param.split('=')[1]
        const name = param.split('=')[0]

        if(queryParams[name]) {
          if(Array.isArray(queryParams[name])){
            queryParams[name].push(urldecode(value))
          }else{
            queryParams[name] = [queryParams[name], urldecode(value)]
          }
        } else {
          queryParams[name] = urldecode(value)
        }
      }
    })
  }



  return queryParams
}

function urldecode(str) {
  return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}
