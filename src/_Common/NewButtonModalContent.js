import React from 'react'
import {Link} from 'react-router-dom'

const ModalContentLinkswrapper = (props) => {
    const handleClick = () => {
        props.toggleModalDisplay()
    }

    return (
        <div className='nav-new-button-modal-content-wrapper'>
            <Link className='nav-new-button-modal-content-link' to='/communities/0' onClick={(e) => handleClick(e)}>Community</Link>
            <Link className='nav-new-button-modal-content-link indent' to='/communities/subcommunities/0' onClick={(e) => handleClick(e)}>Subcommunity</Link>
            <Link className='nav-new-button-modal-content-link' to='/challenges/0' onClick={(e) => handleClick(e)}>Challenge</Link>            
            <Link className='nav-new-button-modal-content-link' to='/students/0/profile' onClick={(e) => handleClick(e)}>Student</Link>
            <Link className='nav-new-button-modal-content-link indent' to='/students/0/challenge-entries/0' onClick={(e) => handleClick(e)}>Challenge Entry</Link>
            <Link className='nav-new-button-modal-content-link indent' to='/students/0/exchanges/0' onClick={(e) => handleClick(e)}>Transaction</Link>
        </div>
    )
}

export default ModalContentLinkswrapper