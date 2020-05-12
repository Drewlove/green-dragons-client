export const GET_INVALID_INPUTS = (inputActual, inputReqs, invalidInputs) => {
    let failedInputReqs = 0; 
    console.log(inputActual)
    console.log(inputReqs)
    for (let [inputReqKey, inputReqValue] of Object.entries(inputReqs)){   
        if(validateInput[inputReqKey](inputActual.value, inputReqValue)){
            failedInputReqs += 0
        } else if(!validateInput[inputReqKey](inputActual.value, inputReqValue)){
            failedInputReqs += 1
        }
    }
    return failedInputReqs > 0 ? addToInvalidInputs(inputActual.name, invalidInputs) : removeFromInvalidInputs(inputActual.name, invalidInputs)        
}

const validateInput= {
    minLength: function(inputActualValue, reqInputValue){
        return inputActualValue.length >= reqInputValue ? true : false
    },
    minNumber: function(inputActualValue, reqInputValue){
        return inputActualValue >= reqInputValue ? true : false
    },
    pattern: function(inputActualValue, reqInputValue){
        return inputActualValue.match(reqInputValue) ? true : false
    },  
    dataType: function(inputActualValue, reqInputValue){
        return typeof inputActualValue === reqInputValue && inputActualValue !== null ? true : false
    },
    required: function(){
        return true
        // return typeof inputActualValue === reqInputValue && inputActualValue !== null ? true : false
    }, 
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