import React, {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import StudentChallengeEntryForm from './StudentChallengeEntryForm'
import Modal from '../../_Common/Modal'
import ModalDeleteConfirm from '../../_Common/ModalDeleteConfirm'
import ShimmerForm from '../../_Common/ShimmerForm'
import {GET_UTCDATE_WITH_TIMEZONE_OFFSET, ELEMENT_DISPLAY_NONE, ELEMENT_DISPLAY, SCROLL_TO_TOP} from '../../Utilities/UtilityFunctions'
import {GET_INVALID_INPUTS} from '../../Utilities/FormValidation'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import 'react-datepicker/dist/react-datepicker.css'

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

    async getAllData(){
        const students =  await this.getData('students')
        const challenges = await this.getData('challenges')
        const challengeEntryRaw = await this.getData(`challenge-entries/${this.props.match.params.challengeEntryId}`) 
        students == null || challenges == null || challengeEntryRaw == null ? 
        this.handleError() : this.updateState(students, challenges, challengeEntryRaw)
    }

    handleError(){
        this.setState({modalMessage: MODAL_MESSAGES.fetchFail})
    }

    updateState(students, challenges, challengeEntryRaw){
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
        
        students == null || challenges == null ? 
        this.handleError() : this.setState({students, challenges}, () => this.setState({isLoaded: true}))
    }

    async getData(endpoint){
        const response = await HTTP_METHODS.getData(endpoint)
        return response.ok ? response.data : this.setState({modalMessage: MODAL_MESSAGES.fetchFail})
    }  
    
    updateChallengeEntry(data){
        const challengeEntry = {...data, entry_date: GET_UTCDATE_WITH_TIMEZONE_OFFSET(data.entry_date)}
        return challengeEntry
    }

    renderModal(){
        ELEMENT_DISPLAY_NONE('main')
        SCROLL_TO_TOP()
        return(
            <Modal toggleModalDisplay={()=> this.toggleModalDisplay()}>
                <p>{this.state.modalMessage}</p>
                {this.state.modalMessage === MODAL_MESSAGES.deleteConfirm ? 
                <ModalDeleteConfirm cancelDelete = {e => this.cancelDelete(e)} deleteRecord = {e => this.deleteRecord(e)}/> : null}
            </Modal>
        )
    }

    toggleModalDisplay(){
        ELEMENT_DISPLAY('main')
        const {modalMessage} = this.state
        if(modalMessage === MODAL_MESSAGES.deleteSuccessful || modalMessage === MODAL_MESSAGES.saveSuccessful){
            this.setState({redirectUrl: `/students/${this.state.challengeEntry.student_id}/challenges/${this.state.challengeEntry.challenge_id}`})
        } else if (modalMessage === MODAL_MESSAGES.fetchFail){
            this.setState({redirectUrl: '/students'})
        } else {
            this.setState({modalMessage: ''})
        }
    }

    handleSave(e){
        e.preventDefault()
        this.validateAllInputs()
        return this.isFormValid() ? this.saveRecord(): this.setState({modalMessage:MODAL_MESSAGES.saveFailInputsInvalid})
    }

    isFormValid(){
        return this.state.invalidInputs.length > 0 ? false : true 
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

    handleDelete(e){
        e.preventDefault()
        this.setState({modalMessage: MODAL_MESSAGES.deleteConfirm})
        ELEMENT_DISPLAY_NONE('main')
    }

    cancelDelete(e){
        ELEMENT_DISPLAY('main')
        this.setState({modalMessage : ''})
    }

    async deleteRecord(){
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
        const prevTime = this.getPrevTime(name, value)
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
            {this.state.isLoaded ? this.renderForm() : <ShimmerForm inputNumber={4}/>}
            </>
        )
    }
}

export default withRouter(StudentChallengeEntryFormContainer)
