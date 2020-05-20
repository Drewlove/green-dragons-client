import React, {Component} from 'react'
import {Redirect, withRouter } from 'react-router-dom'
import StudentFormProfile from './StudentFormProfile'
import Modal from '../../_Common/Modal'
import ShimmerForm from '../../_Common/ShimmerForm'
import {GET_UTCDATE_WITH_TIMEZONE_OFFSET, TOGGLE_HIDE_FORM} from '../../Utilities/UtilityFunctions'
import {GET_INVALID_INPUTS} from '../../Utilities/FormValidation'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import "react-datepicker/dist/react-datepicker.css";

class StudentFormProfileContainer extends Component{
    state = {
        student: {
            first_name: '', 
            last_name: '', 
            birth_date:  null
        },
        invalidInputs: [],
        isLoaded: false, 
        modalMessage: '', 
        redirectUrl: ''
    } 

    async componentDidMount(){
        return this.props.match.params.rowId === "0" ? this.setState({isLoaded: true}) : this.getStudent()
    }

    async getStudent(){
        const endpoint = `students/${this.props.match.params.rowId}`
        const response = await HTTP_METHODS.getData(endpoint)
        response.ok ? this.updateStudent(response.data) : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }  
    
    updateStudent(data){
        const student = {...data, birth_date: GET_UTCDATE_WITH_TIMEZONE_OFFSET(data.birth_date)}
        this.setState({student}, () => this.setState({isLoaded: true})) 
    }

    setModalMessage(modalMessage){
        this.setState({modalMessage})
    }

    toggleModalDisplay(){
        TOGGLE_HIDE_FORM()
        this.setState({modalMessage: ''})
        return this.state.modalMessage === MODAL_MESSAGES.deleteSuccessful || this.state.modalMessage === MODAL_MESSAGES.saveSuccessful ?
        this.setState({redirectUrl: `/students`}) : this.setState({modalMessage: ''})
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
        const student = {
            first_name: '', 
            last_name: '', 
            birth_date: ''
         }
        this.setState({student})
        this.setState({invalidInputs: []})
    }

    handleSave(e){
        e.preventDefault()
        this.validateAllInputs()
        TOGGLE_HIDE_FORM()
        return this.isFormValid() ? this.saveStudentRecord(): this.setState({modalMessage:MODAL_MESSAGES.saveFailInputsInvalid})
    }

    async saveStudentRecord(){
        const saveResponse = await HTTP_METHODS.submitData(this.state.student, this.getEndpointSuffix(), this.isPatchOrPost()) 
        saveResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.saveSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.saveFail})
    }

    isPatchOrPost(){
        return this.props.match.params.rowId === "0" ? 'POST' : 'PATCH'
    }

    getEndpointSuffix(){
        return this.isPatchOrPost() === 'POST' ? `students` : `students/${this.props.match.params.rowId}`
    }

    validateAllInputs(){
        for(let [key, value] of Object.entries(this.state.student)){
            if(key !== 'student_id'){
                this.updateInvalidInputs(key, value)
            } 
        }
    }

    isFormValid(){
        return this.state.invalidInputs.length > 0 ? false : true 
    }

    async handleDelete(e){
        e.preventDefault()
        const deleteResponse = await HTTP_METHODS.deleteData(`students/${this.props.match.params.rowId}`)
        deleteResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.deleteSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.deleteFail})
    }

    handleChange(e){
        const {name, value} = e.target
        const student = {...this.state.student, [name]: value}
        this.setState({student})
        return this.state.invalidInputs.indexOf(e.target.name) >= 0 ? this.updateInvalidInputs(name, value) : null
    }

    handleBirthdateChange(date){
        this.updateInvalidInputs('birth_date', date)
        const student = {...this.state.student, birth_date: date}
        this.setState({student})
    }

    updateInvalidInputs(inputName, inputValue){
        const inputReqs = this.getInputReqs(inputName)
        const inputActual = {name: inputName, value: inputValue}
        const invalidInputs = GET_INVALID_INPUTS(inputActual, inputReqs, this.state.invalidInputs)
        this.setState({invalidInputs})
    }

    getInputReqs(inputName){
        const inputRequirements = {
            first_name: {
                minLength: 1,
            },
            last_name: {
                minLength: 1,
            },
            birth_date:{
                dataType: 'object'
            }
        }   
        return inputRequirements[inputName]
    }

    renderStudentFormProfile(){
        return(
            <StudentFormProfile 
            student = {this.state.student} 
            invalidInputs={this.state.invalidInputs}
            updateInvalidInputs={(name, value)=> this.updateInvalidInputs(name, value)}
            handleChange = {e=> this.handleChange(e)}
            handleBirthdateChange = {e=> this.handleBirthdateChange(e)}
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
            {this.state.isLoaded ? this.renderStudentFormProfile() : <ShimmerForm inputNumber={3}/>}
            </>
        )
    }
}

export default withRouter(StudentFormProfileContainer)
