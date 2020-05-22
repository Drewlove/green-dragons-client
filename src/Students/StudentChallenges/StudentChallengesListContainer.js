import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import StudentName from '../../_Common/StudentName'
import ListMainWrapper from '../../_Common/ListMainWrapper'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import Modal from '../../_Common/Modal'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import ShimmerList from '../../_Common/ShimmerList'

class StudentChallengesListContainer extends Component{
    state = {
        challenges: [],
        modalMessage: '',
        redirectUrl: '', 
        isLoaded: false, 
    }

    async componentDidMount(){
        const allChallenges =  await this.fetchData('challenges')
        const studentRecords = await this.fetchData(`challenge-entries/students/${this.props.match.params.rowId}`)
        const challenges = this.getMatches(allChallenges, studentRecords)
        this.setState({challenges}, () => this.setState({isLoaded: true}))
    }

    async fetchData(endpointSuffix){
        const response = await HTTP_METHODS.getData(endpointSuffix)
        return response.ok ? 
        response.data
        : this.setState({modalMessage: MODAL_MESSAGES.fetchFail})
    }
    
    getMatches(allChallenges, studentRecords){
        const studentRecordsObj = this.arrToObj(studentRecords, 'challenge_id')
        let matches = [];
        allChallenges.forEach(key => {
            const id = key.challenge_id
            return studentRecordsObj[id] && !!matches.indexOf(id) ? matches.push(key) : null;
        });
        return matches;
    };
    
    arrToObj(arr, id){
        return arr.reduce( (obj, item)=>{
            obj[item[id]] = item
            return obj
        }, {})
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
        <>
        <header>
            <StudentName studentId={this.props.match.params.rowId}/>
        </header>
        <main>
            <ListMainWrapper 
            rootPath={`/students/${this.props.match.params.rowId}/challenges`}
            tableName='challenge'
            listData={this.state.challenges}
            propertiesToDisplay={['challenge_name']} 
            listClassName='student-challenges-list'
            />
        </main>
        </>
        )
    }
    
    render(){
        return(
            <>
                {this.state.isLoaded ? this.renderPage() : <ShimmerList listLength={5}/>}
                {this.state.modalMessage.length > 0 ? this.renderModal() : null}
                {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
            </>
        )
    }
}

export default StudentChallengesListContainer
