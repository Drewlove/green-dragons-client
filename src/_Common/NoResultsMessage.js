import React from 'react'

const NoResultsMessage = (props) => {
    return(
    <span className='no-results-message'>No {props.recordName}</span>
    )
}

export default NoResultsMessage