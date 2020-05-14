import React, {Component} from 'react'
import {Redirect, withRouter } from 'react-router-dom'
import StudentChallengeEntryForm from './StudentChallengeEntryForm'
import {GET_UTCDATE_WITH_TIMEZONE_OFFSET} from '../../Utilities/UtilityFunctions'
import {GET_INVALID_INPUTS} from '../../Utilities/FormValidation'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import Modal from '../../_Common/Modal'
import "react-datepicker/dist/react-datepicker.css";

class StudentChallengeEntryFormContainer extends Component{
    state = {
        challengeEntry: {
            challenge_entry_id: null,
            challenge_id: '',
            student_id: '',
            record: '',
            entry_date: null,
            notes: '',
        },
        students: [], 
        challenges: [],
        invalidInputs: [],
        isLoaded: false, 
        modalMessage: '', 
        redirectUrl: ''
    } 

    async componentDidMount(){
        return this.props.match.params.challengeEntryId === "0" ? this.getStudentsAndChallenges() : this.getAllData()
    }

    componentDidUpdate(prevProps){
       if(this.props.match.params.challengeEntryId !== prevProps.match.params.challengeEntryId){
           this.resetForm()
       } 
    }

    async getAllData(){
        const students =  await this.getData('students')
        const challenges = await this.getData('challenges')
        const challengeEntryRaw = await this.getData(`challenge-entries/${this.props.match.params.challengeEntryId}`)
        const challengeEntry = this.updateChallengeEntry(challengeEntryRaw)
        this.setState({
            students, 
            challenges, 
            challengeEntry
        }, () => this.setState({isLoaded: true}))
    }

    async getStudentsAndChallenges(){
        const students =  await this.getData('students')
        const challenges = await this.getData('challenges')    
        this.setState({
            students, 
            challenges, 
        }, () => this.setState({isLoaded: true}))
    }

    async getData(endpoint){
        const response = await HTTP_METHODS.getData(endpoint)
        return response.ok ? response.data : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }  
    
    updateChallengeEntry(data){
        const challengeEntry = {...data, entry_date: GET_UTCDATE_WITH_TIMEZONE_OFFSET(data.entry_date)}
        return challengeEntry
    }

    setModalMessage(modalMessage){
        this.setState({modalMessage})
    }

    toggleModalDisplay(){
        const {student_id, challenge_id} = this.state.challengeEntry
        return this.state.modalMessage === MODAL_MESSAGES.deleteSuccessful || this.state.modalMessage === MODAL_MESSAGES.saveSuccessful ?
        this.setState({redirectUrl: `/students/${student_id}/challenges/${challenge_id}`}) : this.setState({modalMessage: ''})
    }

    renderModal(){
        return(
            <Modal toggleModalDisplay={()=> this.toggleModalDisplay()}>
                <p>{this.state.modalMessage}</p>
            </Modal>
        )
    }

    resetForm(){
        const challengeEntry = {
            challenge_entry_id: '',
            challenge_id: '',
            student_id: '',
            record: '',
            entry_date: null,
            notes: '',
         }
        this.setState({challengeEntry})
        this.setState({invalidInputs: []})
    }

    handleSave(e){
        e.preventDefault()
        this.validateAllInputs()
        return this.isFormValid() ? this.saveRecord(): this.setState({modalMessage:MODAL_MESSAGES.saveFailInputsInvalid})
    }

    async saveRecord(){
        const saveResponse = await HTTP_METHODS.submitData(this.state.challengeEntry, this.getEndpointSuffix(), this.isPatchOrPost()) 
        saveResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.saveSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.saveFail})
    }

    isPatchOrPost(){
        return this.props.match.params.challengeEntryId === "0" ? 'POST' : 'PATCH'
    }

    getEndpointSuffix(){
        return this.isPatchOrPost() === 'POST' ? `challenge-entries` : `challenge-entries/${this.props.match.params.challengeEntryId}`
    }

    validateAllInputs(){
        for(let [key, value] of Object.entries(this.state.challengeEntry)){
            if(key !== 'challenge_entry_id'){
                this.updateInvalidInputs(key, value)
            } 
        }
    }

    isFormValid(){
        return this.state.invalidInputs.length > 0 ? false : true 
    }

    async handleDelete(e){
        e.preventDefault()
        const deleteResponse = await HTTP_METHODS.deleteData(`challenge-entries/${this.props.match.params.challengeEntryId}`)
        deleteResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.deleteSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.deleteFail})
    }

    handleChange(e){
        const {name, value} = e.target
        const challengeEntry = {...this.state.challengeEntry, [name]: value}
        this.setState({challengeEntry})
        return this.state.invalidInputs.indexOf(e.target.name) >= 0 ? this.updateInvalidInputs(name, value) : null
    }

    handleDateChange(date){
        this.updateInvalidInputs('entry_date', date)
        const challengeEntry = {...this.state.challengeEntry, entry_date: date}
        this.setState({challengeEntry})
    }

    handleTimeChange(name, value){
        const prevTime = this.getPrevTime()
        const prevMin = Math.floor(prevTime / 60)
        const prevSec = prevTime % 60
        const newTime = this.getNewTime(value)
        let timeChange = (newTime - prevMin)
        name === 'minutes' ? timeChange = (newTime - prevMin)*60 : timeChange = (newTime - prevSec)
        this.updateTime(prevTime, timeChange)
    }

    getPrevTime(){
        return this.state.challengeEntry.record === '' ? 0 : parseInt(this.state.challengeEntry.record)
    }

    getNewTime(value){
        return value === "" ? 0 : parseInt(value)
    }

    updateTime(prevTime, timeChange){
        const newRecord = prevTime + timeChange
        const challengeEntry = {...this.state.challengeEntry, record: newRecord}
        this.setState({challengeEntry}, () => this.updateInvalidInputs('record', this.state.challengeEntry.record))
    }

    updateInvalidInputs(inputName, inputValue){
        const inputReqs = this.getInputReqs(inputName)
        const inputActual = {name: inputName, value: inputValue}
        const invalidInputs = GET_INVALID_INPUTS(inputActual, inputReqs, this.state.invalidInputs)
        this.setState({invalidInputs})
    }

    getInputReqs(inputName){
        const inputRequirements = {
            challenge_id: {
                minNumber: 1,
            },
            student_id: {
                minNumber: 1,
            },
            entry_date:{
                dataType: 'object'
            }, 
            record:{
                minNumber: 1
            }, 
            notes: {
                required: false 
            }
        }   
        return inputRequirements[inputName]
    }

    renderForm(){
        return(
            <StudentChallengeEntryForm 
            challengeEntry = {this.state.challengeEntry} 
            students={this.state.students}
            challenges={this.state.challenges}
            invalidInputs={this.state.invalidInputs}
            updateInvalidInputs={(name, value)=> this.updateInvalidInputs(name, value)}
            handleChange = {e=> this.handleChange(e)}
            handleDateChange = {e=> this.handleDateChange(e)}
            handleTimeChange = {(name, value)=> this.handleTimeChange(name, value)}
            handleSave = {e => this.handleSave(e)}
            handleDelete = {e => this.handleDelete(e)}
            />    
        )
    }

    render(){
        return(
            <>
            {this.state.modalMessage.length > 0 ? this.renderModal() : null}
            {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl}/> : null}
            {this.state.isLoaded ? this.renderForm() : <h1>Loading</h1>}
            </>
        )
    }
}

export default withRouter(StudentChallengeEntryFormContainer)