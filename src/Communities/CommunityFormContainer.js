import React, {Component} from 'react'
import {Redirect, withRouter } from 'react-router-dom'
import CommunityForm from './CommunityForm'
import Modal from '../_Common/Modal'
import ModalDeleteConfirm from '../_Common/ModalDeleteConfirm'
import ShimmerForm from '../_Common/ShimmerForm'
import {GET_INVALID_INPUTS} from '../Utilities/FormValidation'
import {MODAL_MESSAGES} from '../Utilities/ModalMessages'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import {ELEMENT_DISPLAY, ELEMENT_DISPLAY_NONE, SCROLL_TO_TOP} from '../Utilities/UtilityFunctions'
import "react-datepicker/dist/react-datepicker.css";

class ChallengeFormContainer extends Component{
    state = {
        community: {
            community_id: null,
            community_name: '',
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
        const endpoint = `communities/${this.props.match.params.rowId}`
        const response = await HTTP_METHODS.getData(endpoint)
        response.ok ? this.updateForm(response.data) : this.setState({modalMessage: MODAL_MESSAGES.fetchFail})
    }  
    
    updateForm(data){
        this.setState({community: data}, () => this.setState({isLoaded: true})) 
    }

    componentDidUpdate(prevProps){
        return prevProps.match.params.rowId !== this.props.match.params.rowId ? this.resetForm() : null
    }

    resetForm(){
        const community = {
            community_id: null,
            community_name: '',
         }
        this.setState({community})
        this.setState({invalidInputs: []})
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
        const redirectModalMessages = [MODAL_MESSAGES.fetchFail, MODAL_MESSAGES.deleteSuccessful, MODAL_MESSAGES.saveSuccessful]
        const doesPageRedirect = redirectModalMessages.indexOf(this.state.modalMessage) >= 0  
        return doesPageRedirect ? this.setState({redirectUrl: '/communities'}) : this.setState({modalMessage: ''})
    }
  
    handleDelete(e){
        e.preventDefault()
        this.setState({modalMessage: MODAL_MESSAGES.deleteConfirm})
        ELEMENT_DISPLAY('main')
    }

    cancelDelete(e){
        ELEMENT_DISPLAY('main')
        this.setState({modalMessage : ''})
    }

    async deleteRecord(){
        const deleteResponse = await HTTP_METHODS.deleteData(`communities/${this.props.match.params.rowId}`)
        deleteResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.deleteSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.deleteFail})
    }

    handleSave(e){
        e.preventDefault()
        this.validateAllInputs()
        return this.isFormValid() ? this.saveRecord(): this.setState({modalMessage:MODAL_MESSAGES.saveFailInputsInvalid})
    }

    async saveRecord(){
        const saveResponse = await HTTP_METHODS.submitData(this.state.community, this.getEndpointSuffix(), this.isPatchOrPost()) 
        saveResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.saveSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.saveFail})
    }

    isPatchOrPost(){
        return this.props.match.params.rowId === "0" ? 'POST' : 'PATCH'
    }

    getEndpointSuffix(){
        return this.isPatchOrPost() === 'POST' ? `communities` : `communities/${this.props.match.params.rowId}`
    }

    validateAllInputs(){
        for(let [key, value] of Object.entries(this.state.community)){
            if(key !== 'community_id'){
                this.updateInvalidInputs(key, value)
            } 
        }
    }

    isFormValid(){
        return this.state.invalidInputs.length > 0 ? false : true 
    }

    handleChange(e){
        const {name, value} = e.target
        const community = {...this.state.community, [name]: value}
        this.setState({community})
        return this.state.invalidInputs.indexOf(e.target.name) >= 0 ? this.updateInvalidInputs(name, value) : null
    }

    updateInvalidInputs(inputName, inputValue){
        const inputReqs = this.getInputReqs(inputName)
        const inputActual = {name: inputName, value: inputValue}
        const invalidInputs = GET_INVALID_INPUTS(inputActual, inputReqs, this.state.invalidInputs)
        this.setState({invalidInputs})
    }

    getInputReqs(inputName){
        const inputRequirements = {
            community_name: {
                minLength: 1,
            }
        }   
        return inputRequirements[inputName]
    }

    renderForm(){
        return(
            <CommunityForm 
            community = {this.state.community} 
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
            {this.state.isLoaded ? this.renderForm() : <ShimmerForm inputNumber={1}/>}
            </>
        )
    }
}

export default withRouter(ChallengeFormContainer)
