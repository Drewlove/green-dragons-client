import React from 'react'

const FormInvalidInputMessage = props => {
    return(
        <div className={`invalid-input-message ${props.className}`}> {props.message} </div>
    )
}

export default FormInvalidInputMessage