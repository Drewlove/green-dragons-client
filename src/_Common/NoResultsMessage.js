import React from 'react'

const NoResultsMessage = (props) => {
    return(
    <h2 className='no-reults-message'>No {props.recordName} found</h2>
    )
}

export default NoResultsMessage