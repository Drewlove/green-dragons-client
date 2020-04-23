import config from '../config'

export const HTTP_METHODS = {
    getData: endpointSuffix => getData(endpointSuffix),
    submitData: (data, endpointSuffix, method) => submitData(data, endpointSuffix, method), 
    deleteData: urlSuffix => deleteData(urlSuffix)   
}


const getData = async function(endpointSuffix){
    const url = `${config.API_ENDPOINT}/${endpointSuffix}`
    const options = {
        method: "GET", 
        headers: config.HEADERS
    }
    const response = await fetch(url, options)
    let result = {
        ok: false, 
        data: {}
    }
    if(response.ok){
        result.ok = true
        result.data = await response.json()
        return result 
    } else {
        return result
    }
}

const submitData = async function(data, endpointSuffix, method){
    const options = {
        method: method,
        body: JSON.stringify(data), 
        headers: {
            "Authorization" : config.API_KEY, 
            "Content-Type": "application/json", 
        }
    }
    const url = `${config.API_ENDPOINT}/${endpointSuffix}`
    return await fetch(url, options)
}

const deleteData = async function(endpointSuffix){
    const options = {
        method: "DELETE", 
        headers: {
            "authorization": config.API_KEY, 
            "content-type": "application/json"
        }
    }
    const url = `${config.API_ENDPOINT}/${endpointSuffix}`
    return await fetch(url, options)
}

