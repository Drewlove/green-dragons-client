import React from 'react'
import DatePicker from "react-datepicker";
import FormInvalidInputMessage from '../../_Common/FormInvalidInputMessage'

const StudentExchangeForm = (props) => {
    const {exchange_id, exchange_date, student_id, amount, note} = props.exchange

    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputMessage message={message}/> : <FormInvalidInputMessage className='visibility-hidden' message={message}/>
    }

    const handleBlur = e  => {
        props.updateInvalidInputs(e.target.name, e.target.value)
    }

    const handleDateBlur = e  => {
        props.updateInvalidInputs('exchange_date', e.target.value)
    }

    const renderOptions = () => {
        return props.students.map(key => {
            return (
            <option value={key.student_id} key={key.student_id}>{key.first_name} {key.last_name}</option>
            )
        })
    }

    return(
    <main>
        <form className='student-exchange-form'>
            <fieldset>
                <legend>
                    <h2>Dragon Bucks</h2>
                </legend>
                <section className='inputs-section'>
                    <label htmlFor='student'>Student</label>
                    <div className='input-wrapper'>
                        <select 
                        name='student_id' 
                        id='student' 
                        value={student_id} 
                        onChange={e => props.handleChange(e)}>
                            <option value={''} disabled>-</option>
                            {renderOptions()}
                        </select>
                    </div>
                    <label htmlFor='amount'>Amount</label>
                    <div className='input-wrapper'>
                    <input 
                        id='amount'
                        type='number' 
                        name='amount'
                        value={amount} 
                        onChange={e => props.handleChange(e)}
                        onBlur={(e) => handleBlur(e)}
                        />
                        {isInputValid('amount', 'Must be at least $0.01')}
                    </div>
                    <label htmlFor='exchangeDate'>Date</label>
                    <div className='input-wrapper'>
                        <DatePicker 
                        id='exchangeDate'
                        selected={exchange_date ? exchange_date : null}
                        onChange={date => props.handleDateChange(date)}
                        onBlur={(e) => handleDateBlur(e)}
                        />
                        {isInputValid('exchange_date', 'Please enter a valid date')}
                    </div>
                    <label htmlFor='note'>Note</label>
                    <div className='input-wrapper'>
                        <textarea 
                        name='note'
                        id='note'
                        value={note} 
                        onChange={e=>props.handleChange(e)}/>
                    </div>
                    </section>
                    <section className='button-section'>
                        {exchange_id ? <button onClick={(e) => props.handleDelete(e)}>Delete</button> : null}
                        <button className='save-button' onClick={e => props.handleSave(e)}>Save</button>
                    </section>
                </fieldset>
            </form>
        </main>
        )
}

export default StudentExchangeForm