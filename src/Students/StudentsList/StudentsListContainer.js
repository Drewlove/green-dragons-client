import React, {Component} from 'react'
import StudentsListItem from './StudentsListItem'
import Modal from '../../_Common/Modal'
import {Redirect} from 'react-router-dom'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'
import MODAL_MESSAGES from '../../_Common/Modal'

class StudentsListContainer extends Component{
    state = {
        students: [], 
        modalMessage: '',
        redirectUrl: '', 
        isLoaded: false, 
    }

    componentDidMount(){
        this.fetchStudents()
    }

    async fetchStudents(){
        const endpointSuffix = `students`
        const response = await HTTP_METHODS.getData(endpointSuffix)
        response.ok ? 
        this.setState({students: response.data}, () => this.setState({isLoaded: true})) 
        : this.setState({modalMessage: MODAL_MESSAGES.getFail})
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
                {this.state.isLoaded ? this.renderPage() : <h1>Loading...</h1>}
                {this.state.modalMessage.length > 0 ? this.renderModal() : null}
                {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
            </>
        )
    }
}

export default StudentsListContainer