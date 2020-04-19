import React, {Component} from 'react'
import {FETCH_DATA} from '../../Utilities/UtilityFunctions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from '../../config'

class StudentFormProfile extends Component{
    state = {
        student: {
            first_name: '', 
            last_name: '', 
            birth_date: ''
        }, 
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
            let result = await FETCH_DATA(`students/${this.props.match.params.student_id}`)
            let student = await result.json()
            console.log(student)
            this.setState({student})
        } catch(error){
            this.setState({errorMessage: 'Failed to Load'})
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

    handleSubmit(e){
        e.preventDefault()

        const options = {
            method: "POST",
            body: JSON.stringify(this.state.student), 
            headers: {
                "Authorization" : config.API_KEY, 
                "Content-Type": "application/json", 
            }
        }
        const url = `${config.DEV_API_ENDPOINT}/students`
        fetch(url, options)
        .then(res => console.log(res))
    }


    render(){
        const {first_name, last_name, birth_date} = this.state.student

        return(
            <main>
                <form className='student-form-profile' onSubmit={e=>this.handleSubmit(e)} >
                    <fieldset>
                        <legend>
                            <h2>Student</h2>
                        </legend>
                        <div className='input-wrapper'>
                            <label>First Name</label>
                            <input 
                            name='first_name'
                            type='text' 
                            value={first_name} 
                            onChange={e => this.handleChange(e)}/>
                        </div>
                        <div className='input-wrapper'>
                        <label>Last Name</label>
                        <input 
                            name='last_name'
                            type='text' 
                            value={last_name} 
                            onChange={e => this.handleChange(e)}/>
                        </div>
                        <div className='input-wrapper'>
                            <label>Date Picker</label>
                            <DatePicker 
                            selected={birth_date ? new Date(birth_date) : null}
                            onChange={date => this.handleBirthdateChange(date)}
                            />
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