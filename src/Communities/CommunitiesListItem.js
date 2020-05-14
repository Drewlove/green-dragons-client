import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import SubcommunitiesListContainer from '../CommunitiesSubcommunities/SubcommunitiesListContainer'

class CommunitiesListItem extends Component{
    state = {
        toggleViewSubcommunities: false,
    }

    handleClick(){
        const toggleViewSubcommunities = !this.state.toggleViewSubcommunities
        this.setState({toggleViewSubcommunities})
    }

    render(){
        const {community_id, community_name} = this.props.community
        return(
            <li className={`communities-list-item ${this.state.toggleViewSubcommunities ? 'view-subcommunities' :''}`}>
                <div className='communities-list-item-community-wrapper'>
                    <button onClick={() => this.handleClick()} className='communities-list-item-button'>&#10148;</button>
                    <div className='communities-list-item-link-wrapper'>
                        <Link className='communities-list-item-link' to={`/communities/${community_id}`}>{community_name}</Link>
                    </div>
                </div>
                <SubcommunitiesListContainer community_id={community_id}/>
             </li>
        )
    }
} 

export default CommunitiesListItem