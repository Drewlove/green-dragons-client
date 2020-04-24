import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import StudentFormProfileContainer from '../Students/StudentFormsProfileAndCommunities/StudentFormProfileContainer'
import Modal from './Modal'
import {HTTP_METHODS} from '../Utilities/HttpMethods'
import {MODAL_MESSAGES} from '../Utilities/ModalMessages'
import "react-datepicker/dist/react-datepicker.css";

class FormContainer extends Component{
    state = {
        modalMessage: '',
        redirectUrl: ''
    } 
 
    currentRowId = this.props.match.params.rowId
    tableName = this.props.tableName

    getHttpMethod(){
        return this.currentRowId === "0" ? 'POST' : 'PATCH' 
    }

    getEndpointSuffix(endpointSuffix){
        return endpointSuffix === "POST" ? `${this.tableName}` : `${this.tableName}/${this.currentRowId}`
    }

    async fetchRowFromTable(){
        try{
            let result = await HTTP_METHODS.getData(`${this.tableName}/${this.currentRowId}`)
            return result.ok ? result.data : this.setState({modalMessage: MODAL_MESSAGES.getFail})
        } catch(error){
            this.setState({modalMessage: 'Failed to Load'})
        }
    }

    async submitForm(formObj){
        let modalMessage
        const httpMethod = this.getHttpMethod()
        const endpointSuffix = this.getEndpointSuffix(httpMethod)
        try{
            const result = await HTTP_METHODS.submitData(formObj, endpointSuffix, httpMethod)
            result.ok ? modalMessage = MODAL_MESSAGES.saveSuccessful : modalMessage = MODAL_MESSAGES.saveFail
            return this.setState({modalMessage})
        } catch(error){
            modalMessage = MODAL_MESSAGES.saveFail
            this.setState({modalMessage})
        }
    }

    async handleDelete(e){
        e.preventDefault()
        let modalMessage
        const urlSuffix = `${this.tableName}/${this.currentRowId}`
        try {
            const result = await HTTP_METHODS.deleteData(urlSuffix)
            result.ok ? modalMessage = MODAL_MESSAGES.deleteSuccessful : modalMessage = MODAL_MESSAGES.deleteFail
            return this.setState({modalMessage})
        } catch{
            modalMessage = MODAL_MESSAGES.deleteFail
            this.setState({modalMessage})   
        }
    }

    toggleModalDisplay(){
        this.setState({redirectUrl: `/${this.tableName}`})
    }

    renderModal(){
        return(
            <Modal toggleModalDisplay={()=> this.toggleModalDisplay()}>
                <p>{this.state.modalMessage}</p>
            </Modal>
        )
    }

    renderStudentFormProfile(){
        return(
            <StudentFormProfileContainer 
            fetchRowFromTable = {() => this.fetchRowFromTable()}
            submitForm = {formObj => this.submitForm(formObj)}
            handleDelete = {(e) => this.handleDelete(e) } 
            />    
        )
    }

    render(){
        return(
            <>
            {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl}/> : null}
            {this.state.modalMessage.length > 0 ? this.renderModal() : this.renderStudentFormProfile()}         
            </>
        )
    }
}

export default withRouter(FormContainer)