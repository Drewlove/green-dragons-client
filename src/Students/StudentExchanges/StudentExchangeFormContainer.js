import React, {Component} from 'react'
import {Redirect, withRouter } from 'react-router-dom'
import StudentExchangeForm from './StudentExchangeForm'
import {GET_UTCDATE_WITH_TIMEZONE_OFFSET} from '../../Utilities/UtilityFunctions'
import {GET_INVALID_INPUTS} from '../../Utilities/FormValidation'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import Modal from '../../_Common/Modal'

class StudentExchangeFormContainer extends Component{
    state = {
        exchange: {
            exchange_date: null,
            student_id: null, 
            amount: 0
        },
        students: [],
        invalidInputs: [],
        isLoaded: false, 
        modalMessage: '', 
        redirectUrl: ''
    } 

    async componentDidMount(){
        return this.props.match.params.exchangeRowId === "0" ? 
        this.getStudents() 
        : this.getStudentsAndExchange()
    }

    componentDidUpdate(prevProps){
        return prevProps.match.params.exchangeRowId !== this.props.match.params.exchangeRowId ? this.resetForm() : null
    }

    getStudents(){
        const students = this.getAllRowsFromEndpoint('students')
        this.setState({students}, () => this.setState({isLoaded: true}))
    }

    async getStudentsAndExchange(){
        const students = await this.getAllRowsFromEndpoint('students')
        const exchangeRaw = await this.getRowFromEndpoint('exchanges')
        console.log(students, exchangeRow)
        const exchange = this.reformatDate(exchangeRaw)
        this.setState({students})
        this.setState({exchange}, () => this.setState({isLoaded: true}))
    }

    async getAllRowsFromEndpoint(endpoint){
        const response = await HTTP_METHODS.getData(endpoint)
        return response.ok ? response.data : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }

    async getRowFromEndpoint(endpoint){
        const response = await HTTP_METHODS.getData(`${endpoint}/${this.props.match.params.exchangeRowId}`)
        return response.ok ? response.data : this.setState({modalMessage: MODAL_MESSAGES.getFail})
    }   
    
    reformatDate(data){
        const exchange = {...data, exchange_date: GET_UTCDATE_WITH_TIMEZONE_OFFSET(data.exchange_date)}
        return exchange
    }

    setModalMessage(modalMessage){
        this.setState({modalMessage})
    }

    toggleModalDisplay(){
        return this.state.modalMessage === MODAL_MESSAGES.deleteSuccessful || this.state.modalMessage === MODAL_MESSAGES.saveSuccessful ?
        this.setState({redirectUrl: `/students/${this.state.exchange.student_id}/exchanges`}) : this.setState({modalMessage: ''})
    }

    renderModal(){
        return(
            <Modal toggleModalDisplay={()=> this.toggleModalDisplay()}>
                <p>{this.state.modalMessage}</p>
            </Modal>
        )
    }

    handleChange(e){
        const {name, value} = e.target
        const exchange = {...this.state.exchange, [name]: value}
        this.setState({exchange})
        return this.state.invalidInputs.indexOf(e.target.name) >= 0 ? this.updateInvalidInputs(name, value) : null
    }

    handleDateChange(date){
        this.updateInvalidInputs('exchange_date', date)
        const exchange = {...this.state.exchange, exchange_date: date}
        this.setState({exchange})
    }

    getInputReqs(inputName){
        const inputRequirements = {
            amount: {
                minLength: 1,
                // pattern: /^[a-zA-Z ]*[A-Z]+[a-zA-Z ]*$/g //one capital letter, allow spaces
            },
            student_id: {
                minNumber: 1,
            },
            exchange_date:{
                dataType: 'object'
            },
            note: {
                required: false
            }
        }   
        return inputRequirements[inputName]
    }

    resetForm(){
        const exchange = {
            exchange_date: null, 
            student_id: null, 
            amount: ''
         }
        this.setState({exchange})
        this.setState({invalidInputs: []})
    }

    handleSave(e){
        e.preventDefault()
        this.validateAllInputs()
        return this.isFormValid() ? this.saveRecord(): this.setState({modalMessage:MODAL_MESSAGES.saveFailInputsInvalid})
    }

    validateAllInputs(){
        for(let [key, value] of Object.entries(this.state.exchange)){
            if(key !== 'exchange_id'){
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

    isFormValid(){
        return this.state.invalidInputs.length > 0 ? false : true 
    }

    async saveRecord(){
        const saveResponse = await HTTP_METHODS.submitData(this.state.exchange, this.getEndpointSuffix(), this.isPatchOrPost()) 
        saveResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.saveSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.saveFail})
    }

    getEndpointSuffix(){
        return this.isPatchOrPost() === 'POST' ? `exchanges` : `exchanges/${this.props.match.params.exchangeRowId}`
    }

    isPatchOrPost(){
        return this.props.match.params.exchangeRowId === "0" ? 'POST' : 'PATCH'
    }

    async handleDelete(e){
        e.preventDefault()
        const deleteResponse = await HTTP_METHODS.deleteData(`exchanges/${this.props.match.params.exchangeRowId}`)
        deleteResponse.ok ? this.setState({modalMessage: MODAL_MESSAGES.deleteSuccessful}) : this.setState({modalMessage: MODAL_MESSAGES.deleteFail})
    }

    renderStudentFormProfile(){
        return(
            <StudentExchangeForm 
            exchange = {this.state.exchange} 
            students={this.state.students}
            invalidInputs={this.state.invalidInputs}
            updateInvalidInputs={(name, value)=> this.updateInvalidInputs(name, value)}
            handleChange = {e=> this.handleChange(e)}
            handleDateChange = {e=> this.handleDateChange(e)}
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
            {this.state.isLoaded ? this.renderStudentFormProfile() : <h1>Loading</h1>}
            </>
        )
    }
}

export default withRouter(StudentExchangeFormContainer)
