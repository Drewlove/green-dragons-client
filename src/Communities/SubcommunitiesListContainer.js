import React, {Component} from 'react'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import MODAL_MESSAGES from '../_Common/Modal'
import SubcommunitiesListItem from './SubcommunitiesListItem'

class SubcommunitiesListContainer extends Component{
    state = {
        subcommunities: [], 
        isLoaded: false, 
        message:  ''
    }

    componentDidMount(){
        this.getAllRowsFromEndpoint(`subcommunities/communities/${this.props.community_id}`)
    }

    async getAllRowsFromEndpoint(endpoint){
        const response = await HTTP_METHODS.getData(endpoint)
        return response.ok ? 
        this.setState({subcommunities: response.data}, () => this.setState({isLoaded: true}))
        : this.setState({message: MODAL_MESSAGES.getFail})
    }

    renderSubcommunitiesList(){
        return this.state.subcommunities.map(subcommunity => {
            return(
                <SubcommunitiesListItem key={subcommunity.subcommunity_id} subcommunity={subcommunity}/>
            )
        })
    }

    render(){
        return(
            <ul className='communities-list-item-subcommunities-list'>
            <h2>Subcommunities</h2>
            {this.state.isLoaded ? this.renderSubcommunitiesList() : <h1>Loading...</h1>}
        </ul>
        )
    }
} 

export default SubcommunitiesListContainer