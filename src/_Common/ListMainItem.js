import React from 'react'

const ListMainItem = (props) => {
    return(
    <li className='list-main-item'>
        <a href={props.path}>
            {props.children}
        </a> 
    </li>
    )
}

export default ListMainItem