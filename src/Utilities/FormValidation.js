export const GET_INVALID_INPUTS = (inputActual, inputReqs, invalidInputs) => {
    let failedInputReqs = 0; 
    for (let [inputReqProperty, inputReqValue] of Object.entries(inputReqs)){   
        if(validateInputAgainstReq[inputReqProperty](inputActual.value, inputReqValue)){
            failedInputReqs += 0
        } else if(!validateInputAgainstReq[inputReqProperty](inputActual.value, inputReqValue)){
            failedInputReqs += 1
        }
    }
    return failedInputReqs > 0 ? addToInvalidInputs(inputActual.name, invalidInputs) : removeFromInvalidInputs(inputActual.name, invalidInputs)        
}

const validateInputAgainstReq = {
    length: function(actualInputValue, reqInputValue){
        return actualInputValue.length >= reqInputValue ? true : false
    },
    pattern: function(actualInputValue, reqInputValue){
        const actualInputValueStripPunctuation = actualInputValue.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
        return actualInputValueStripPunctuation.match(reqInputValue) ? true : false
    }, 
    dataType: function(actualInputValue, reqInputValue){
        return typeof actualInputValue === reqInputValue && actualInputValue !== null ? true : false
    }
}

const addToInvalidInputs = (inputActualName, invalidInputs) => {
    if(invalidInputs.indexOf(inputActualName) === -1){
        invalidInputs.push(inputActualName)
        return invalidInputs
    } else if(invalidInputs.indexOf(inputActualName) >=0 ){
        return invalidInputs
    }
}

const removeFromInvalidInputs = (inputActualName, invalidInputs) => {
    const index = invalidInputs.indexOf(inputActualName)
    if(invalidInputs.indexOf(inputActualName) >= 0){
        invalidInputs.splice(index, 1)
        return invalidInputs
    } else if(invalidInputs.indexOf(inputActualName) === -1){
        return invalidInputs
    }
}