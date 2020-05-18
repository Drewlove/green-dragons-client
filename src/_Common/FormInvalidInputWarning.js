import React from 'react'

const FormInvalidInputWarning = props => {

    const isHidden = () => {
        return props.hidden ? 'visibility-hidden' : ''
    }
    return(
        <>
        <span className={`invalid-input-warning ${isHidden()}`}>*</span>
        </>
    )
}

export default FormInvalidInputWarning