import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import StudentName from '../../_Common/StudentName'
import ListMainWrapper from '../../_Common/ListMainWrapper'
import StudentChallengeEntriesGraph from './StudentChallengeEntriesGraph'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import Modal from '../../_Common/Modal'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import {GET_MM_DD_YYYY_DATE, CONVERT_TIME} from '../../Utilities/UtilityFunctions'

class StudentChallengeEntriesListContainer extends Component{
    state = {
        challengeEntries: [],
        challengeType: {},
        view: 'Graph',
        modalMessage: '',
        redirectUrl: '', 
        isLoaded: false, 
    }
    async componentDidMount(){
        const challengeType = await this.fetchData(`challenges/${this.props.match.params.challengeId}`)
        this.setState({challengeType}, () => this.fetchChallenges())
    }

    async fetchChallenges(){
        const studentId = this.props.match.params.rowId
        const challengeId = this.props.match.params.challengeId
        const challengeEntriesRaw = await this.fetchData(`challenge-entries/students/${studentId}/challenges/${challengeId}`)
        const challengeEntries = await this.reformatListItems(challengeEntriesRaw)
        this.setState({challengeEntries}, () => this.setState({isLoaded: true}))
    }

    async fetchData(endpointSuffix){
        const response = await HTTP_METHODS.getData(endpointSuffix)
        return response.ok ? 
        response.data
        : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }
    
    async reformatListItems(list){
        return list.map(key => {
            return {
                ...key, 
                entry_date : GET_MM_DD_YYYY_DATE(key.entry_date), 
            }
        })
    }

    reformatTime(list){
        const {challengeType} = this.state
        return list.map(key => {
            return {
                ...key, 
                record: challengeType.units === 'seconds' ? CONVERT_TIME(key.record) : `${key.record} ${challengeType.units}`
            }
        })
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

    renderHeader(){
       return(
        <header>
            <StudentName studentId={this.props.match.params.rowId}/>
            <h2>{this.state.challengeType.challenge_name}</h2>
        </header>
       ) 
    }

    renderPage(){
        return this.state.challengeEntries.length > 0 ? this.renderResults() : this.renderNoResults()
    }

    renderResults(){
        return(
        <>
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

    renderNoResults(){
        return(
            <h1>No results</h1>
        )
    }

    renderGraph(){
        return(
            <StudentChallengeEntriesGraph 
            challengeEntries={this.state.challengeEntries}
            challengeType={this.state.challengeType}
            />
        )
    }

    renderList(){
        return (
        <ListMainWrapper 
        rootPath={`/challenge-entries`}
        tableName='challenge_entry'
        listData={this.reformatTime(this.state.challengeEntries)}
        propertiesToDisplay={['entry_date', 'record']} 
        listClassName='challenge-entries-list'
        />
       )
    }
    
    render(){
        return(
            <>
            {this.renderHeader()}
            {this.state.isLoaded ? this.renderPage() : <h1>Loading...</h1>}
            {this.state.modalMessage.length > 0 ? this.renderModal() : null}
            {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
            </>
        )
    }
}

export default StudentChallengeEntriesListContainer
