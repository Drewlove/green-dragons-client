import React from 'react'
import DatePicker from "react-datepicker";
import FormInvalidInputWarning  from '../../_Common/FormInvalidInputWarning'

const StudentFormProfile = (props) => {
    const {first_name, last_name, birth_date, student_id} = props.student

    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputWarning /> : <FormInvalidInputWarning  hidden={true} message={message}/>
    }

    const handleBlur = e  => {
        props.updateInvalidInputs(e.target.name, e.target.value)
    }

    const handleDateBlur = e  => {
        const date = new Date(e.target.value)
        props.updateInvalidInputs('birth_date', date)
    }

    return(
        <main>
        <form className='student-form-profile test' onSubmit={e => props.handleSave(e)}>
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
                        {isInputValid('first_name')}
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
                        {isInputValid('last_name')}
                    </div>
                    <label htmlFor='birthDate'>Birthdate</label>
                    <div className='input-wrapper'>
                        <DatePicker 
                        id='birthDate'
                        selected={birth_date ? birth_date : null}
                        onChange={date => props.handleBirthdateChange(date)}
                        onBlur={(e) => handleDateBlur(e)}
                        />
                        {isInputValid('birth_date')}
                    </div>
                </section>
                <section className='button-section'>
                    {student_id ? <button className='button-delete' onClick={(e) => props.handleDelete(e)}>Delete</button> : null}
                    <button className='button-primary' onClick={e => props.handleSave(e)}>Save</button>
                </section>
            </fieldset>
        </form>
    </main>
    )
}

export default StudentFormProfile
