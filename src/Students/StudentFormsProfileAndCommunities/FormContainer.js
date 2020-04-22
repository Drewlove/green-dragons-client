import React, {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import StudentFormProfileContainer from './StudentFormProfileContainer'
import Modal from '../../_Common/Modal'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import "react-datepicker/dist/react-datepicker.css";

class FormContainer extends Component{
    state = {
        modalMessage: '',
        redirectUrl: ''
    } 
 
    currentRowId = this.props.match.params.row_id
    tableName = this.props.tableName

    isPostOrPatch(){
        return this.currentRowId === "0" ? 'POST' : 'PATCH' 
    }

    async fetchRowFromTable(){
        try{
            let result = await HTTP_METHODS.getData(`${this.tableName}/${this.currentRowId}`)
            return result.ok ? result.data : this.setState({modalMessage: MODAL_MESSAGES.getFail})
        } catch(error){
            this.setState({modalMessage: 'Failed to Load'})
        }
    }

    getSubmitFormOptions(formObj){
        this.isPostOrPatch() === "POST" ? 
        this.submitForm(this.tableName, 'POST', formObj) 
        : this.submitForm(`${this.tableName}/${this.currentRowId}`, 'PATCH', formObj)
    }

    //HERE, the date must be correctly set on the studentFormProfileContainer
    async submitForm(urlSuffix, method, formObj){
        let modalMessage
        let formObjCopy = {...formObj, birth_date: new Date(formObj.birth_date)}
        try{
            const result = await HTTP_METHODS.postOrPatchData(formObjCopy, urlSuffix, method)
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
            isPostOrPatch = {() => this.isPostOrPatch()}
            getSubmitFormOptions = {formObj => this.getSubmitFormOptions(formObj)}
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