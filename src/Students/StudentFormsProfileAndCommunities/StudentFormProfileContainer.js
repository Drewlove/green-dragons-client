import React, {Component} from 'react'
import StudentFormProfile from './StudentFormProfile'
import Modal from '../../_Common/Modal'
import {getDataFromEndpoint, postDataToEndpoint} from '../../Utilities/UtilityFunctions'
import {withRouter, Redirect} from 'react-router-dom'
import config from '../../config'
import "react-datepicker/dist/react-datepicker.css";

class StudentFormProfileContainer extends Component{
    state = {
        student: {
            first_name: '', 
            last_name: '', 
            birth_date: ''
        }, 
        modalMessage: '',
        redirectUrl: ''
    } 

    componentDidMount(){
        this.isPatchOrPost()
    }

    componentDidUpdate(prevProps){
        return prevProps.match.params.student_id !== this.props.match.params.student_id ? this.resetForm() : null
    }

    resetForm(){
        const student = {
            first_name: '', 
            last_name: '', 
            birth_date: ''
         }
        this.setState({student})
    }

    isPatchOrPost(){
        return this.props.match.params.student_id !== "0" ? this.fetchStudent() : null 
    }

    async fetchStudent(){
        try{
            let result = await getDataFromEndpoint(`students/${this.props.match.params.student_id}`)
            return result.ok ? this.setState({student: result.data}) : this.setState({modalMessage: "Failed to load"})
        } catch(error){
            this.setState({modalrMessage: 'Failed to Load'})
        }
    }

    handleChange(e){
        const student = {...this.state.student, [e.target.name]: e.target.value}
        this.setState({student})
    }

    handleBirthdateChange(date){
        const student = {...this.state.student, birth_date: date}
        this.setState({student})
    }

    async handleSubmit(e){
        e.preventDefault()
        const endpoint = `${config.API_ENDPOINT}/students`
        let modalMessage = ''
        try{
            const result = await postDataToEndpoint(this.state.student, endpoint)
            result.ok ? modalMessage = 'Success!' : modalMessage = "Failed to submit"
            return this.setState({modalMessage})
        }catch(error){
            modalMessage = "Failed so submit. Please try again"
            this.setState({modalMessage})
        }
    }

    toggleModalDisplay(){
        this.setState({redirectUrl: '/students'})
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
            <StudentFormProfile 
            student = {this.state.student} 
            handleChange = {e=> this.handleChange(e)}
            handleBirthdateChange = {e=> this.handleBirthdateChange(e)}
            handleSubmit = {e => this.handleSubmit(e)} />    
        )
    }

    render(){
        return(
            <>
            {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl}/> : null}
            {this.state.modalMessage.length > 0 ? this.renderModal() : this.renderStudentFormProfile()}         
            }
            </>
        )
    }
}

export default withRouter(StudentFormProfileContainer)