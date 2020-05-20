import React, {Component} from 'react'
import ListMainWrapper from '../_Common/ListMainWrapper'
import Modal from '../_Common/Modal'
import {Redirect} from 'react-router-dom'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import MODAL_MESSAGES from '../_Common/Modal'
import ShimmerList from '../_Common/ShimmerList'

class ChallengesListContainer extends Component{
    state = {
        challenges: [], 
        modalMessage: '',
        redirectUrl: '', 
        isLoaded: false, 
    }

    componentDidMount(){
        this.fetchChallenges()
    }

    async fetchChallenges(){
        const endpointSuffix = `challenges`
        const response = await HTTP_METHODS.getData(endpointSuffix)
        response.ok ? 
        this.setState({challenges: response.data}, () => this.setState({isLoaded: true})) 
        : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }

    closeModal(){
        this.setState({redirectUrl: '/'})
    }

    renderModal(){
        return(
            <Modal closeModal={()=> this.closeModal()}>
                <p>{this.state.modalMessage}</p>
            </Modal>
        )
    }

    renderPage(){
        return(
        <main>
            <ListMainWrapper 
            rootPath='/challenges'
            tableName='challenge'
            listData={this.state.challenges}
            propertiesToDisplay={['challenge_name']} 
            listClassName='challenges-list'
            />
        </main>
        )
    }

    renderShimmerList(){
        return(
        <main>
            <ShimmerList listLength={5}/>
        </main>
        )
    }
    
    render(){
        return(
            <>
                {this.state.isLoaded ? this.renderPage() : this.renderShimmerList()}
                {this.state.modalMessage.length > 0 ? this.renderModal() : null}
                {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
            </>
        )
    }
}

export default ChallengesListContainer
