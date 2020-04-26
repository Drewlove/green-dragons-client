import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import StudentFormProfile from './StudentFormProfile'
import {GET_UTCDATE_WITH_TIMEZONE_OFFSET} from '../../Utilities/UtilityFunctions'
import {GET_INVALID_INPUTS} from '../../Utilities/FormValidation'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import "react-datepicker/dist/react-datepicker.css";

class StudentFormProfileContainer extends Component{
    state = {
        student: {
            first_name: '', 
            last_name: '', 
            birth_date:  null
        },
        invalidInputs: [],
        isLoaded: false
    } 

    async componentDidMount(){
        return this.props.match.params.rowId === "0" ? this.setState({isLoaded: true}) : this.setState({student: await this.props.fetchRowFromTable()}, 
        () => this.castStringToDateObject(this.state.student.birth_date))
    }

    castStringToDateObject(dateString){
        const student = {...this.state.student, birth_date: GET_UTCDATE_WITH_TIMEZONE_OFFSET(dateString)}
        this.setState({student}, () => this.setState({isLoaded: true}))
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
    }
    
    //NEXT
    //FormContainer specifically renders StudentProfileFormContainer, how to render dynamically?
    //API endpoint tests
    //walk, exercise, call Noah? Liam?


    handleSave(e){
        e.preventDefault()
        this.validateAllInputs()
        return this.isFormValid() ? this.props.submitForm(this.state.student) :  this.props.setModalMessage(MODAL_MESSAGES.saveFailInputsInvalid)
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

    handleDelete(e){
        this.props.handleDelete(e)
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
                length: 2,
                pattern: /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/g //one capital letter
            },
            last_name: {
                length: 2,
                pattern: /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/g //one capital letter
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
            handleDelete = {e => this.props.handleDelete(e)}
            />    
        )
    }

    render(){
        return(
            <>
            {this.state.isLoaded ? this.renderStudentFormProfile() : <h1>Loading</h1>}
            </>
        )
    }
}

export default withRouter(StudentFormProfileContainer)
