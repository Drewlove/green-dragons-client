import React, {Component} from 'react'
import config from '../config'
import StudentsListItem from './StudentsListItem'

class StudentsListContainer extends Component{

    state = {
        students: [], 
        error: ''
    }

    componentDidMount(){
        this.fetchStudents()
    }

    async fetchStudents(){
        const url = `${config.API_ENDPOINT}/api/students` 
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": config.API_KEY
            }
        }
        
        try{
            let response = await fetch(url, options)
            let students = await response.json()
            this.setState({students})
        } catch(error){
            this.setState({error: 'Failed to load'})            
        }
        
    }


    renderStudentsList(){
        return this.state.students.map(student => {
            return(
                <StudentsListItem student={student}/>
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
