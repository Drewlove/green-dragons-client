import React, {Component} from 'react'
import CommunitiesListItem from './CommunitiesListItem'
import Modal from '../_Common/Modal'
import {Redirect} from 'react-router-dom'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import MODAL_MESSAGES from '../_Common/Modal'
import ShimmerList from '../_Common/ShimmerList'

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
        return response.ok ? 
        this.setState({communities: response.data}, () => this.setState({isLoaded: true}))
        : this.setState({modalMessage: MODAL_MESSAGES.getFail})
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
            {this.renderCommunities()}
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
