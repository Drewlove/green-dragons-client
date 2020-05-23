import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import ShimmerList from '../../_Common/ShimmerList'
import StudentsListItem from './StudentsListItem'
import {MODAL_MESSAGES} from '../../Utilities/ModalMessages'
import {ELEMENT_DISPLAY_NONE} from '../../Utilities/UtilityFunctions'
import Modal from '../../_Common/Modal'
import {HTTP_METHODS} from '../../Utilities/HttpMethods'

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
        response.ok ? this.updateState(response.data) : this.handleError(response)
    }

    updateState(response){
        const students = response
        this.setState({students}, () => this.setState({isLoaded: true})) 
    }

    handleError(response){
        ELEMENT_DISPLAY_NONE('main')
        this.setState({modalMessage: response.error})  
    }

    renderModal(){
        return(
            <Modal toggleModalDisplay={()=> this.toggleModalDisplay()}>
                <p>{this.state.modalMessage}</p>
            </Modal>
        )
    }

    toggleModalDisplay(){
        this.setState({redirectUrl: '/'})
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

    renderShimmerList(){
        return(
            <main>
                <ShimmerList listLength={5}/>
            </main>
        )
    }
    
    render(){
        return(
            <>
                {this.state.isLoaded ? this.renderPage() : this.renderShimmerList()}
                {this.state.modalMessage.length > 0 ? this.renderModal() : null}
                {this.state.redirectUrl.length > 0 ? <Redirect to={this.state.redirectUrl} /> : null}
            </>
        )
    }
}

export default StudentsListContainer
