import React, {Component} from 'react'
import CommunitiesListItem from './CommunitiesListItem'
import Modal from '../_Common/Modal'
import {Redirect} from 'react-router-dom'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import {ELEMENT_DISPLAY_NONE} from '../Utilities/UtilityFunctions'
import ShimmerList from '../_Common/ShimmerList'
import NoResultsMessage from '../_Common/NoResultsMessage'

class CommunitiesListContainer extends Component{
    state = {
        communities: [],
        modalMessage: '',
        redirectUrl: '', 
        isLoaded: false, 
    }

    componentDidMount(){
        this.getAllRowsFromEndpoint('communities')
    }

    async getAllRowsFromEndpoint(endpoint){
        const response = await HTTP_METHODS.getData(endpoint)
        return response.ok ? this.updateState(response.data) : this.handleError(response)
    }

    updateState(response){
        const communities = response
        this.setState({communities}, () => this.setState({isLoaded: true})) 
    }

    handleError(response){
        ELEMENT_DISPLAY_NONE('ul')
        this.setState({modalMessage: response.error})  
    }

    toggleModalDisplay(){
        this.setState({redirectUrl: '/'})
    }

    renderModal(){
        return(
            <Modal toggleModalDisplay={()=> this.toggleModalDisplay()}>
                <p>{this.state.modalMessage}</p>
            </Modal>
        )
    }

    renderPage(){
        return(
        <main>
            <ul className='list-main-wrapper'>
            {this.state.communities.length > 0 ? this.renderCommunities() : this.renderNoResults()}
            </ul>
        </main>
        )
    }

    renderCommunities(){
        return this.state.communities.map(community => {
            return (
                <CommunitiesListItem key={community.community_id} community={community}/>
            )
        })
    }

    renderNoResults(){
        return (
            <NoResultsMessage recordName='communities' />
        )
    }
    
    render(){
        return(
            <>
                {this.state.isLoaded ? this.renderPage() : <ShimmerList listLength = {5}/>}
                {this.state.modalMessage.length > 0 ? this.renderModal() : null}
                {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
            </>
        )
    }
}

export default CommunitiesListContainer
