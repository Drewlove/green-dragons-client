import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CommunitiesListItemSubcommunitiesList from './CommunitiesListItemSubcommunitiesList'

class CommunitiesListItem extends Component{
    state = {
        toggleViewSubcommunities: false
    }

    handleClick(){
        const toggleViewSubcommunities = !this.state.toggleViewSubcommunities
        this.setState({toggleViewSubcommunities})
    }

    render(){
        return(
            <li className={`communities-list-item ${this.state.toggleViewSubcommunities ? 'view-subcommunities' :''}`}>
                <div className='communities-list-item-community-wrapper'>
                    <button onClick={() => this.handleClick()} className='communities-list-item-button'>&#10148;</button>
                    <div className='communities-list-item-link-wrapper'>
                        <Link className='communities-list-item-link' to={`/communities/${this.props.community.community_id}`}>{this.props.community.community_name}</Link>
                    </div>
                </div>
                {/* <CommunitiesListItemSubcommunitiesList subcommunities={this.props.listItem.subcommunities}/> */}
             </li>
        )
    }
} 

export default CommunitiesListItem