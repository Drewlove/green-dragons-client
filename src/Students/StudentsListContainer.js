import React, {Component} from 'react'
import studentIcon from '../Assets/student.png'
import ChallengesIcon from '../Assets/challenges.png'
import CommunitiesIcon from '../Assets/communities.png'
import {Link} from 'react-router-dom'
import config from '../config'

class StudentsListContainer extends Component{

    state = {
        students: []
    }

    componentDidMount(){
        this.fetchStudents()
    }

    fetchStudents(){
        const url = `${config.API_ENDPOINT}/api/students` 
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": config.API_KEY
            }
        }

        fetch(url, options)
        .then(res => res.json())
        .then(students => console.log(students))
        // .then(students => this.setState({students}))
        //if fail, then convert to async
    }


    renderStudentsList(){
        // const studentsList = [
        // {name: 'Kaitlin Keleher', id: 1}, 
        // {name: 'Mike Cermak', id: 2}, 
        // {name: 'Ale Cabrera-Mondragon', id: 3}
        // ]

        return this.state.students.map(key => {
            return(
                <li key={key.student_id} className='students-list-item'>
                    <div className='students-list-item-name'>
                        <p>{key.first_name} {key.last_name}</p>
                    </div>
                    <div className='students-list-item-links-wrapper'>
                        <Link className='students-list-item-link' to={`/students/${key.student_id}/profile`}>
                            <img className='students-list-item-link-icon' alt='student icon' src={studentIcon}/>
                            <p className='students-list-item-link-tooltip'>Profile</p>
                        </Link>
                        <Link className='students-list-item-link' to={`/students/${key.student_id}/communities`}>
                            <img className='students-list-item-link-icon' alt='communities icon' src={CommunitiesIcon}/>
                            <p className='students-list-item-link-tooltip'>Communities</p>                     
                        </Link>
                        <Link className='students-list-item-link' to={`/students/${key.student_id}/challenges`}>
                            <img className='students-list-item-link-icon' alt='challenges icon' src={ChallengesIcon}/>
                            <p className='students-list-item-link-tooltip'>Challenges</p>
                        </Link>
                        <Link className='students-list-item-link-transactions' to={`/students/${key.student_id}/dragon-bucks`}>
                            <div >$100.00</div>
                            <p className='students-list-item-link-tooltip'>Transactions</p>
                        </Link>
                    </div>
                </li>
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
