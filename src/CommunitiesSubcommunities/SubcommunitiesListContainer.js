import React, {Component} from 'react'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import SubcommunitiesListItem from './SubcommunitiesListItem'
import {ELEMENT_DISPLAY_NONE} from '../Utilities/UtilityFunctions'
import ShimmerList from '../_Common/ShimmerList'

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
        response.ok ? this.updateState(response.data) : this.handleError(response)
    }

    updateState(response){
        const subcommunities = response
        this.setState({subcommunities}, () => this.setState({isLoaded: true})) 
    }

    handleError(response){
        ELEMENT_DISPLAY_NONE('main')
        this.setState({modalMessage: response.error})  
    }

    renderSubcommunities(){
        return this.state.subcommunities.length > 0 ? this.renderList() : this.renderEmptyList()
    }

    renderList(){
        return this.state.subcommunities.map(subcommunity => {
            return(
                <SubcommunitiesListItem key={subcommunity.subcommunity_id} subcommunity={subcommunity}/>
            )
        })
    }

    renderEmptyList(){
        return(
            <p>No subcommunities</p>
        )
    }

    render(){
        return(
            <ul className='communities-list-item-subcommunities-list'>
                {this.state.isLoaded ? this.renderSubcommunities() : <ShimmerList listLength={5} /> }
        </ul>
        )
    }
} 

export default SubcommunitiesListContainer