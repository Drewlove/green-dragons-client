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

    let result = {
        ok: false, 
        error: '',
        data: {}
    }

    try{
        const response = await fetch(url, options)
        return response.ok ? result = {...result, ok: true, data: await response.json()} : result = {...result, ok: false, error: `${response.statusText}`}
    } catch(error){
        return result = {ok: false, error: 'Error. Could not retrieve record'}   
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
    try{
        const result = await fetch(url, options)
        return result 
    } catch(error){
        return error 
    }
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
    try {
        const result = await fetch(url, options)
        return result 
    } catch(error){
        return error 
    }
}



// e.preventDefault()
// let modalMessage
// const urlSuffix = `${this.tableName}/${this.currentRowId}`
// try {
//     const result = await HTTP_METHODS.deleteData(urlSuffix)
//     result.ok ? modalMessage = MODAL_MESSAGES.deleteSuccessful : modalMessage = MODAL_MESSAGES.deleteFail
//     return this.setState({modalMessage})
// } catch{
//     modalMessage = MODAL_MESSAGES.deleteFail
//     this.setState({modalMessage})   
// }