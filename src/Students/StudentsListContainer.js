import React, {Component} from 'react'
import StudentsListItem from './StudentsListItem'
import Modal from '../_Common/Modal'
import {Redirect} from 'react-router-dom'
import {HTTP_METHODS} from '../Utilities/HttpMethods'

class StudentsListContainer extends Component{
    state = {
        students: [], 
        modalMessage: '',
        redirectUrl: ''
    }

    componentDidMount(){
        this.fetchStudents()
    }

    async fetchStudents(){
        try{
            const result = await HTTP_METHODS.getData('students')
            result.ok ? this.setState({students: result.data}) : this.setState({modalMessage: "Failed to load"})
        } catch(error){
            this.setState({errorMessage: 'Failed to Load'})
        }
    }

    toggleModalDisplay(){
        this.setState({redirectUrl: '/'})
    }

    renderModal(){
        return(
            <Modal toggleModalDisplay={()=> this.toggleModalDisplay()}>
                <p>{this.state.modalMessage}</p>
            </Modal>
        )
    }

    renderPage(){
        return(
            <main>
                <ul className='list-main-wrapper'>
                    {this.renderStudentsList()}
                </ul>
            </main>
        )
    }

    renderStudentsList(){
        return this.state.students.map(student => {
            return(
                <StudentsListItem student={student} key={student.student_id}/>
            )
        })
    }
    
    render(){
        return(
            <>
                {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
                {this.state.modalMessage.length > 0 ? this.renderModal() : this.renderPage()}
            </>
        )
    }
}

export default StudentsListContainer
