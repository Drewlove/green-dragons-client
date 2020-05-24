import React from 'react'
import DatePicker from "react-datepicker";
import FormInvalidInputWarning  from '../../_Common/FormInvalidInputWarning'
import FormSaveDeleteButtons from '../../_Common/FormSaveDeleteButtons'

const StudentExchangeForm = (props) => {
    const {exchange_id, exchange_date, student_id, amount, note} = props.exchange

    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputWarning  message={message}/> : <FormInvalidInputWarning  hidden={true} message={message}/>
    }

    const handleBlur = e  => {
        props.updateInvalidInputs(e.target.name, e.target.value)
    }

    const handleDateBlur = e  => {
        const date = new Date(e.target.value)
        props.updateInvalidInputs('exchange_date', date)
    }

    const renderOptions = () => {
        return props.students.map(key => {
            return (
            <option value={key.student_id} key={key.student_id}>{key.first_name} {key.last_name}</option>
            )
        })
    }

    const isAmountNegative = () =>{
        return amount < 0 ? "negative-amount" : ""
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
                        {isInputValid('student_id', 'Must choose a student')}
                    </div>
                    <label htmlFor='amount'>Amount</label>
                    <div className='input-wrapper'>
                    <input 
                        id='amount'
                        type='number' 
                        className={isAmountNegative()}
                        name='amount'
                        value={amount}
                        onChange={e => props.handleChange(e)}
                        onBlur={(e) => handleBlur(e)}
                        />
                        {isInputValid('amount', 'Positive or negative, no more than two decimal places')}
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
                    <label className='label-textarea' htmlFor='note'>Note</label>
                    <div className='input-wrapper'>
                        <textarea 
                        name='note'
                        id='note'
                        value={note} 
                        onChange={e=>props.handleChange(e)}/>
                    </div>
                    </section>
                    <FormSaveDeleteButtons 
                    recordId = {exchange_id} 
                    handleDelete={e => props.handleDelete(e)} 
                    handleSave={e=> props.handleSave(e)}/>
                </fieldset>
            </form>
        </main>
        )
}

export default StudentExchangeForm