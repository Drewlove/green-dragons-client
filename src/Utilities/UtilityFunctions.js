import config from '../config'

export const getDataFromEndpoint = async function(urlSuffix){
    const url = `${config.API_ENDPOINT}/${urlSuffix}`
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

export const submitDataToEndpoint = async function(data, urlSuffix, method){
    const options = {
        method: method,
        body: JSON.stringify(data), 
        headers: {
            "Authorization" : config.API_KEY, 
            "Content-Type": "application/json", 
        }
    }
    const url = `${config.API_ENDPOINT}/${urlSuffix}`
    return await fetch(url, options)
}

