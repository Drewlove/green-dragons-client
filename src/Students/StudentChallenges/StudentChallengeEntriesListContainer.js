import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import StudentName from '../../_Common/StudentName'
import ListMainWrapper from '../../_Common/ListMainWrapper'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import Modal from '../../_Common/Modal'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import {GET_MM_DD_YYYY_DATE} from '../../Utilities/UtilityFunctions'

class StudentChallengeEntriesListContainer extends Component{
    state = {
        challengeEntries: [],
        challengeType: {},
        view: 'Graph',
        modalMessage: '',
        redirectUrl: '', 
        isLoaded: false, 
    }

    //have two tabs, Graph, List
    //so this component renders the header, then either the graph or list, depending upon user's selection

    async componentDidMount(){
        const challengeType = await this.fetchData(`challenges/${this.props.match.params.challengeId}`)
        this.setState({challengeType}, () => this.fetchChallenges())
    }

    async fetchChallenges(){
        const studentId = this.props.match.params.rowId
        const challengeId = this.props.match.params.challengeId
        const challengesRaw = await this.fetchData(`challenge-entries/students/${studentId}/challenges/${challengeId}`)
        const challengeEntries = await this.reformatListItems(challengesRaw)
        this.setState({challengeEntries}, () => this.setState({isLoaded: true}))
    }

    async fetchData(endpointSuffix){
        const response = await HTTP_METHODS.getData(endpointSuffix)
        return response.ok ? 
        response.data
        : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }
    
    async reformatListItems(list){
        const {challengeType} = this.state
        return list.map(key => {
            return {
                ...key, 
                entry_date : GET_MM_DD_YYYY_DATE(key.entry_date), 
                record: challengeType.units === 'seconds' ? this.convertTime(key.record) : `${key.record} ${challengeType.units}`
            }
        })
    }

    convertTime(time){
        const minutes = Math.floor(time/60)
        const seconds = time%60
        return `${minutes} min ${seconds} seconds`
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

    handleClick(e){
        this.setState({view: e.target.innerHTML})
    }

    renderGraph(){
        return(
            <h1>Graph</h1>
        )
    }

    renderList(){
        return (
        <ListMainWrapper 
        rootPath={`/challenge-entries`}
        tableName='challenge_entry'
        listData={this.state.challengeEntries}
        propertiesToDisplay={['entry_date', 'record']} 
        listClassName='challenge-entries-list'
        />
       )
    }

    renderPage(){
        return(
        <>
        <header>
            <StudentName studentId={this.props.match.params.rowId}/>
        <h2>{this.state.challengeType.challenge_name}</h2>
        </header>
        <section>
            <button onClick={(e) => this.handleClick(e)}>Graph</button>
            <button onClick={(e) => this.handleClick(e)}>List</button>
        </section>
        <main>
            {this.state.view === 'Graph' ? this.renderGraph() : this.renderList()}
        </main>
        </>
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

export default StudentChallengeEntriesListContainer
