import React, {Component} from 'react'
import {Redirect, withRouter } from 'react-router-dom'
import SubcommunityForm from './SubcommunityForm'
import {GET_INVALID_INPUTS} from '../Utilities/FormValidation'
import {MODAL_MESSAGES} from '../Utilities/ModalMessages'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import Modal from '../_Common/Modal'
import ShimmerForm from '../_Common/ShimmerForm'
import "react-datepicker/dist/react-datepicker.css";

class SubcommunityFormContainer extends Component{
    state = {
        subcommunity: {
            subcommunity_id: null,
            subcommunity_name: '',
            community_id: '',
        },
        communities: [],
        invalidInputs: [],
        isLoaded: false, 
        modalMessage: '', 
        redirectUrl: ''
    } 

    async componentDidMount(){
        return this.props.match.params.rowId === "0" ? this.getCommunities() : this.getData()
    }

    async getCommunities(){
        const communities = await this.getAllRowsFromEndpoint('communities')
        this.setState({communities}, this.setState({isLoaded: true}))
    }

    async getData(){
        const communities = await this.getAllRowsFromEndpoint('communities')
        const subcommunity = await this.getRowFromEndpoint('subcommunities')
        this.setState({communities})
        this.setState({subcommunity}, () => this.setState({isLoaded: true}))
    }

    async getAllRowsFromEndpoint(endpoint){
        const response = await HTTP_METHODS.getData(endpoint)
        return response.ok ? response.data : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }

    async getRowFromEndpoint(endpoint){
        const response = await HTTP_METHODS.getData(`${endpoint}/${this.props.match.params.rowId}`)
        return response.ok ? response.data : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }  

    setModalMessage(modalMessage){
        this.setState({modalMessage})
    }

    toggleModalDisplay(){
        return this.state.modalMessage === MODAL_MESSAGES.deleteSuccessful || this.state.modalMessage === MODAL_MESSAGES.saveSuccessful ?
        this.setState({redirectUrl: `/communities`}) : this.setState({modalMessage: ''})
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
        const community = {
            community_id: null,
            community_name: '',
         }
        this.setState({community})
        this.setState({invalidInputs: []})
    }

    handleSave(e){
        e.preventDefault()
        this.validateAllInputs()
        return this.isFormValid() ? this.saveRecord(): this.setState({modalMessage:MODAL_MESSAGES.saveFailInputsInvalid})
    }

    async saveRecord(){
        const saveResponse = await HTTP_METHODS.submitData(this.state.subcommunity, this.getEndpointSuffix(), this.isPatchOrPost()) 
        saveResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.saveSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.saveFail})
    }

    isPatchOrPost(){
        return this.props.match.params.rowId === "0" ? 'POST' : 'PATCH'
    }

    getEndpointSuffix(){
        return this.isPatchOrPost() === 'POST' ? `subcommunities` : `subcommunities/${this.props.match.params.rowId}`
    }

    validateAllInputs(){
        for(let [key, value] of Object.entries(this.state.subcommunity)){
            if(key !== 'subcommunity_id'){
                this.updateInvalidInputs(key, value)
            } 
        }
    }

    isFormValid(){
        return this.state.invalidInputs.length > 0 ? false : true 
    }

    async handleDelete(e){
        e.preventDefault()
        const deleteResponse = await HTTP_METHODS.deleteData(`subcommunities/${this.props.match.params.rowId}`)
        deleteResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.deleteSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.deleteFail})
    }

    handleChange(e){
        const {name, value} = e.target
        const subcommunity = {...this.state.subcommunity, [name]: value}
        this.setState({subcommunity})
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
            subcommunity_name: {
                minLength: 1,
            },
            community_id: {
                minNumber: 1,
            }
        }   
        return inputRequirements[inputName]
    }

    renderForm(){
        return(
            <SubcommunityForm 
            subcommunity = {this.state.subcommunity} 
            communities={this.state.communities}
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
            {this.state.isLoaded ? this.renderForm() : <ShimmerForm inputNumber={2} />}
            </>
        )
    }
}

export default withRouter(SubcommunityFormContainer)
