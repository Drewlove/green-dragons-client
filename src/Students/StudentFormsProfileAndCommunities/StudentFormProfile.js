import React from 'react'
import DatePicker from "react-datepicker";

const StudentFormProfile = (props) => {
    const {first_name, last_name, birth_date} = props.student
    return(
        <main>
        <form className='student-form-profile'>
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
                    onChange={e => props.handleChange(e)}/>
                </div>
                <div className='input-wrapper'>
                <label>Last Name</label>
                <input 
                    name='last_name'
                    type='text' 
                    value={last_name} 
                    onChange={e => props.handleChange(e)}/>
                </div>
                <div className='input-wrapper'>
                    <label>Date Picker</label>
                    <DatePicker 
                    selected={birth_date ? new Date(birth_date) : null}
                    onChange={date => props.handleBirthdateChange(date)}
                    />
                </div>
                <section className='button-wrapper'>
                    <button onClick={(e) => props.handleDelete(e)}>Delete</button>
                    <button onClick={e => props.handleSave(e)}>Save</button>
                </section>
            </fieldset>
        </form>
    </main>
    )
}

export default StudentFormProfile