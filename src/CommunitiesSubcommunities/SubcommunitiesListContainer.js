import React, {Component} from 'react'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import SubcommunitiesListItem from './SubcommunitiesListItem'
import NoResultsMessage from '../_Common/NoResultsMessage'

class SubcommunitiesListContainer extends Component{
    state = {
        subcommunities: [], 
        isLoaded: false, 
        errorMessage:  ''
    }

    componentDidMount(){
        this.getAllRowsFromEndpoint(`subcommunities/communities/${this.props.community_id}`)
    }

    async getAllRowsFromEndpoint(endpoint){
        const response = await HTTP_METHODS.getData(endpoint)
        response.ok ? this.updateState(response.data) : this.updateError()
    }

    updateState(response){
        const subcommunities = response
        this.setState({subcommunities}, () => this.setState({isLoaded: true})) 
    }

    updateError(){
        this.setState({errorMessage: 'Error'}, () => this.setState({isLoaded: true}))
    }

    renderPage(){
        return this.state.errorMessage.length > 0 ? this.renderError() : this.renderSubcommunities()
    }

    renderError(){
        return(
        <h2>{this.state.errorMessage}</h2>
        )
    }

    renderSubcommunities(){
        return this.state.subcommunities.length > 0 ? this.renderList() : <NoResultsMessage recordName='subcommunities'/>
    }

    renderList(){
        return this.state.subcommunities.map(subcommunity => {
            return(
                <SubcommunitiesListItem key={subcommunity.subcommunity_id} subcommunity={subcommunity}/>
            )
        })
    }

    render(){
        return(
            <ul className='communities-list-item-subcommunities-list'>
                {this.state.isLoaded ? this.renderPage() : null }
        </ul>
        )
    }
} 

export default SubcommunitiesListContainer