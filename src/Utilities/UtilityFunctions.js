import config from '../config'

export const FETCH_DATA = async function(urlEndpoint){
    const url = `${config.API_ENDPOINT}/${urlEndpoint}`
    const options = {
        method: "GET", 
        headers: config.HEADERS
    }
    let result = await fetch(url, options)
    return result
}