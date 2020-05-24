import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import StudentChallengeEntriesGraph from './StudentChallengeEntriesGraph'
import StudentName from '../../_Common/StudentName'
import ListMainWrapper from '../../_Common/ListMainWrapper'
import Modal from '../../_Common/Modal'
import ShimmerGraph from '../../_Common/ShimmerGraph'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
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
        : this.setState({modalMessage: MODAL_MESSAGES.fetchFail})
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
                record: challengeType.units === 'time' ? CONVERT_TIME(key.record) : `${key.record} ${challengeType.units}`
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

    isFocused(name){
        return name === this.state.view ? ' button-focused' : ''
    }

    renderHeader(){
       return(
        <header className='student-challenge-entries-header'>
            <StudentName studentId={this.props.match.params.rowId}/>
            <h3>{this.state.challengeType.challenge_name}</h3>
            <section>
                <button className={`student-challenge-entries-button${this.isFocused('Graph')}`} onClick={(e) => this.handleClick(e)}>Graph</button>
                <button className={`student-challenge-entries-button${this.isFocused('List')}`} onClick={(e) => this.handleClick(e)}>List</button>
            </section>
        </header>
       ) 
    }

    renderPage(){
        return this.state.challengeEntries.length > 0 ? this.renderResults() : this.renderNoResults()
    }

    renderResults(){
        return(
        <>
        <main>
            {this.state.view === 'Graph' ? this.renderGraph() : this.renderList()}
        </main>
        </>
        )
    }

    renderNoResults(){
        return(
            <div className= 'student-challenge-entries-no-records'>No Records Found</div>
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
        rootPath={`/students/${this.props.match.params.rowId}/challenge-entries`}
        tableName='challenge_entry'
        listData={this.reformatTime(this.state.challengeEntries).reverse()}
        propertiesToDisplay={['entry_date', 'record']} 
        listClassName='challenge-entries-list'
        />
       )
    }
    
    render(){
        return(
            <>
            {this.renderHeader()}
            {this.state.isLoaded ? this.renderPage() : <ShimmerGraph/> }
            {this.state.modalMessage.length > 0 ? this.renderModal() : null}
            {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
            </>
        )
    }
}

export default StudentChallengeEntriesListContainer
