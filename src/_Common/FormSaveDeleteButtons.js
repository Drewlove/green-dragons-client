import React from 'react'

const FormSaveDeleteButtons = (props) => {
    return(
    <section className='button-section'>
        {props.recordId ? 
        <button className='button-delete' type = 'button' onClick={(e) => props.handleDelete(e)}>Delete</button> : null}
        <button className='button-primary' onClick={e => props.handleSave(e)}>Save</button>
    </section>
    )
}

export default FormSaveDeleteButtons

