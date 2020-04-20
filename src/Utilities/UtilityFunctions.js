import config from '../config'

export const getDataFromEndpoint = async function(urlEndpoint){
    const url = `${config.API_ENDPOINT}/${urlEndpoint}`
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



export const postDataToEndpoint = async function(data, endpoint){
    const options = {
        method: "POST",
        body: JSON.stringify(data), 
        headers: {
            "Authorization" : config.API_KEY, 
            "Content-Type": "application/json", 
        }
    }
    return await fetch(endpoint, options)
}