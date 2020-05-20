import React from 'react'

const Modal = (props) => {
    return(
    <section className='modal-section'>
        <div className='modal-content'>
            <button  onClick={()=>props.closeModal()} className='modal-content-close-button'>
                X
            </button>
            {props.children}
        </div>
    </section>
    )
}

export default Modal