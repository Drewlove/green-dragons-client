import React from 'react'

const ModalDeleteConfirm = (props) => {

    const handleCancel = (e) => {
        props.cancelDelete(e)
    }

    const handleDelete = (e) => {
        props.deleteRecord(e)
    }
        return(
            <section className='button-section'>
                <button className='button-delete' onClick={e => handleDelete()}>Delete</button>
                <button className='button-primary' onClick={e => handleCancel(e)}>Cancel</button>
            </section>
        )
}

export default ModalDeleteConfirm