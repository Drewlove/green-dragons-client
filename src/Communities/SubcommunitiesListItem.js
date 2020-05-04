import React from 'react'
import {Link} from 'react-router-dom'

const SubcommunitiesListItem = (props) => {

    const {subcommunity_name, subcommunity_id} = props.subcommunity

    return(
            <li className='communities-list-item-subcommunities-list-item'>
                <Link 
                className='communities-list-item-subcommunities-list-item-link'
                to={`/communities/subcommunities/${subcommunity_id}`}>
                    {subcommunity_name}
                </Link>
            </li>
    )
}

export default SubcommunitiesListItem