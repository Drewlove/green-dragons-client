import React, {Component} from 'react'
import StudentsListItem from './StudentsListItem'
import {FETCH_DATA} from '../Utilities/UtilityFunctions'

class StudentsListContainer extends Component{

    state = {
        students: [], 
        errorMessage: ''
    }

    componentDidMount(){
        this.fetchStudents()
    }

    async fetchStudents(){
        try{
            let result = await FETCH_DATA('students')
            let students = await result.json()
            this.setState({students})
        } catch(error){
            this.setState({errorMessage: 'Failed to Load'})
        }
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
            <main>
                <ul className='list-main-wrapper'>
                    {this.renderStudentsList()}
                </ul>
            </main>
        )
    }
}

export default StudentsListContainer
