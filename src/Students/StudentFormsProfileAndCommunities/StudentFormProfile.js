import React, {Component} from 'react'
import {FETCH_DATA} from '../../Utilities/UtilityFunctions'

class StudentFormProfile extends Component{
    state = {
        student: {}, 
        errorMessage: ''
    } 

    componentDidMount(){
        this.fetchStudent()
    }

    async fetchStudent(){
        try{
            let result = await FETCH_DATA(`students/${this.props.match.params.student_id}`)
            let student = await result.json()
            this.setState({student})
        } catch(error){
            this.setState({errorMessage: 'Failed to Load'})
        }
    }

    render(){
        const {first_name, last_name, birth_date} = this.state.student

        return(
            <main>
                <form className='student-form-profile'>
                    <fieldset>
                        <legend>
                            <h2>Student</h2>
                        </legend>
                        <div className='input-wrapper'>
                            <label>First Name</label>
                            <input type='text' value={first_name}/>
                        </div>
                        <div className='input-wrapper'>
                            <label>Last Name</label>
                            <input type='text' value={last_name}/>
                        </div>
                        <div className='input-wrapper'>
                            <label>Birthdate</label>
                            <input type='text' value={birth_date}/>
                        </div>
                        <section className='button-wrapper'>
                            <button>Delete</button>
                            <button>Save</button>
                        </section>
                    </fieldset>
                </form>
            </main>
            )
        }
    }

export default StudentFormProfile