import React, {Component} from 'react'
import CommunitiesListItem from './CommunitiesListItem'
import Modal from '../_Common/Modal'
import {Redirect} from 'react-router-dom'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import MODAL_MESSAGES from '../_Common/Modal'

class ChallengesListContainer extends Component{
    state = {
        communities: [], 
        modalMessage: '',
        redirectUrl: '', 
        isLoaded: false, 
    }

    componentDidMount(){
        this.fetchChallenges()
    }

    async fetchChallenges(){
        const endpointSuffix = `communities`
        const response = await HTTP_METHODS.getData(endpointSuffix)
        response.ok ? 
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
            {this.state.communities.map(community => {
                return(
                    <CommunitiesListItem 
                    community={community}  
                    key={community.community_id}                  
                    />
                )
            })
            }
        </main>
        )
    }
    
    render(){
        return(
            <>
                {this.state.isLoaded ? this.renderPage() : <h1>Loading...</h1>}
                {this.state.modalMessage.length > 0 ? this.renderModal() : null}
                {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
            </>
        )
    }
}

export default ChallengesListContainer
