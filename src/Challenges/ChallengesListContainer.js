import React, {Component} from 'react'
import ListMainWrapper from '../_Common/ListMainWrapper'
import Modal from '../_Common/Modal'
import {Redirect} from 'react-router-dom'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import {ELEMENT_DISPLAY_NONE} from '../Utilities/UtilityFunctions'
import NoResultsMessage from '../_Common/NoResultsMessage'
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
        response.ok ? this.updateState(response.data) : this.handleError(response)
    }

    updateState(response){
        const challenges = response
        this.setState({challenges}, () => this.setState({isLoaded: true})) 
    }

    handleError(response){
        ELEMENT_DISPLAY_NONE('main')
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
        console.log('render page')
        console.log(this.state.challenges.length)
        return this.state.challenges.length > 0 ? this.renderList() : this.renderNoResults()
    }

    renderList(){
        console.log('renderlist')
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

    renderNoResults(){
        console.log('no results')
        return(
            <NoResultsMessage recordName='challenges'/>
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
