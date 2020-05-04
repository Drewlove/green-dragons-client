import React, {Component} from 'react'
import {Redirect, withRouter } from 'react-router-dom'
import ChallengeForm from './ChallengeForm'
import {GET_INVALID_INPUTS} from '../Utilities/FormValidation'
import {MODAL_MESSAGES} from '../Utilities/ModalMessages'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import Modal from '../_Common/Modal'
import "react-datepicker/dist/react-datepicker.css";

class ChallengeFormContainer extends Component{
    state = {
        challenge: {
            challenge_id: null,
            challenge_name: '',
            challenge_description: '',
            challenge_best_record: '',
            units: '',
        },
        invalidInputs: [],
        isLoaded: false, 
        modalMessage: '', 
        redirectUrl: ''
    } 

    async componentDidMount(){
        return this.props.match.params.rowId === "0" ? this.setState({isLoaded: true}) : this.getRowFromTable()
    }

    async getRowFromTable(){
        const endpoint = `challenges/${this.props.match.params.rowId}`
        const response = await HTTP_METHODS.getData(endpoint)
        response.ok ? this.updateForm(response.data) : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }  
    
    updateForm(data){
        this.setState({challenge: data}, () => this.setState({isLoaded: true})) 
    }

    setModalMessage(modalMessage){
        this.setState({modalMessage})
    }

    toggleModalDisplay(){
        return this.state.modalMessage === MODAL_MESSAGES.deleteSuccessful || this.state.modalMessage === MODAL_MESSAGES.saveSuccessful ?
        this.setState({redirectUrl: `/challenges`}) : this.setState({modalMessage: ''})
    }

    renderModal(){
        return(
            <Modal toggleModalDisplay={()=> this.toggleModalDisplay()}>
                <p>{this.state.modalMessage}</p>
            </Modal>
        )
    }

    componentDidUpdate(prevProps){
        return prevProps.match.params.rowId !== this.props.match.params.rowId ? this.resetForm() : null
    }

    resetForm(){
        const challenge = {
            challenge_id: null,
            challenge_name: '',
            challenge_description: '',
            challenge_best_record: '',
            units: '',
         }
        this.setState({challenge})
        this.setState({invalidInputs: []})
    }

    handleSave(e){
        e.preventDefault()
        console.log('handleSave')
        this.validateAllInputs()
        return this.isFormValid() ? this.saveRecord(): this.setState({modalMessage:MODAL_MESSAGES.saveFailInputsInvalid})
    }

    async saveRecord(){
        console.log('saveRecord')
        const saveResponse = await HTTP_METHODS.submitData(this.state.challenge, this.getEndpointSuffix(), this.isPatchOrPost()) 
        saveResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.saveSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.saveFail})
    }

    isPatchOrPost(){
        return this.props.match.params.rowId === "0" ? 'POST' : 'PATCH'
    }

    getEndpointSuffix(){
        return this.isPatchOrPost() === 'POST' ? `challenges` : `challenges/${this.props.match.params.rowId}`
    }

    validateAllInputs(){
        console.log('validateAllInputs')
        for(let [key, value] of Object.entries(this.state.challenge)){
            if(key !== 'challenge_id'){
                this.updateInvalidInputs(key, value)
            } 
        }
    }

    isFormValid(){
        console.log('isFormValid')
        return this.state.invalidInputs.length > 0 ? false : true 
    }

    async handleDelete(e){
        e.preventDefault()
        const deleteResponse = await HTTP_METHODS.deleteData(`challenges/${this.props.match.params.rowId}`)
        deleteResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.deleteSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.deleteFail})
    }

    handleChange(e){
        const {name, value} = e.target
        const challenge = {...this.state.challenge, [name]: value}
        this.setState({challenge})
        return this.state.invalidInputs.indexOf(e.target.name) >= 0 ? this.updateInvalidInputs(name, value) : null
    }

    updateInvalidInputs(inputName, inputValue){
        const inputReqs = this.getInputReqs(inputName)
        const inputActual = {name: inputName, value: inputValue}
        console.log(inputActual, inputActual.value.length)
        const invalidInputs = GET_INVALID_INPUTS(inputActual, inputReqs, this.state.invalidInputs)
        this.setState({invalidInputs})
    }

    //HOW TO VERIFY CHALLENGE_BEST_RECORD?
    getInputReqs(inputName){
        const inputRequirements = {
            challenge_name: {
                minLength: 2,
                pattern: /^[a-zA-Z0-9 ]*[A-Z]+[a-zA-Z0-9 ]*$/g //one capital letter, allow spaces, and numbers
            },
            challenge_description: {
                minLength: 2,
                pattern: /^[a-zA-Z0-9 ]*[A-Z]+[a-zA-Z0-9 ]*$/g //one capital letter, allow spaces, and numbers
            },
            challenge_best_record: {
                minLength: 1
            },
            units: {
                minNumber: 1,
            },
        }   
        return inputRequirements[inputName]
    }

    renderForm(){
        return(
            <ChallengeForm 
            challenge = {this.state.challenge} 
            invalidInputs={this.state.invalidInputs}
            updateInvalidInputs={(name, value)=> this.updateInvalidInputs(name, value)}
            handleChange = {e=> this.handleChange(e)}
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

export default withRouter(ChallengeFormContainer)