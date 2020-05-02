import React from 'react'
import DatePicker from "react-datepicker";
import FormInvalidInputMessage from '../../_Common/FormInvalidInputMessage'

const StudentFormProfile = (props) => {
    const {first_name, last_name, birth_date, student_id} = props.student

    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputMessage message={message}/> : <FormInvalidInputMessage className='visibility-hidden' message={message}/>
    }

    const handleBlur = e  => {
        props.updateInvalidInputs(e.target.name, e.target.value)
    }

    const handleDateBlur = e  => {
        props.updateInvalidInputs('birth_date', e.target.value)
    }

    return(
        <main>
        <form className='student-form-profile'>
            <fieldset>
                <legend>
                    <h2>Student</h2>
                </legend>
                <section className='inputs-section'>
                    <label htmlFor='firstName'>First Name</label>
                    <div className='input-wrapper'>
                        <input 
                        id='firstName'
                        type='text' 
                        name='first_name'
                        value={first_name} 
                        required
                        onChange={e => props.handleChange(e)}
                        onBlur={(e) => handleBlur(e)}
                        />
                        {isInputValid('first_name', 'Must have two letters, at least one capital letter')}
                    </div>
                <label htmlFor='lastName'>Last Name</label>
                    <div className='input-wrapper'>
                        <input 
                        id='lastName'
                        type='text' 
                        name='last_name'
                        value={last_name} 
                        onChange={e => props.handleChange(e)}
                        onBlur={(e) => handleBlur(e)}
                        />
                        {isInputValid('last_name', 'Must have two letters, at least one capital letter')}
                    </div>
                    <label htmlFor='birthDate'>Birthdate</label>
                    <div className='input-wrapper'>
                        <DatePicker 
                        id='birthDate'
                        selected={birth_date ? birth_date : null}
                        onChange={date => props.handleBirthdateChange(date)}
                        onBlur={(e) => handleDateBlur(e)}
                        />
                        {isInputValid('birth_date', 'Please enter a valid date')}
                    </div>
                </section>
                <section className='button-section'>
                    {student_id ? <button onClick={(e) => props.handleDelete(e)}>Delete</button> : null}
                    <button className='save-button' onClick={e => props.handleSave(e)}>Save</button>
                </section>
            </fieldset>
        </form>
    </main>
    )
}

export default StudentFormProfile
