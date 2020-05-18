import React from 'react'
import DatePicker from "react-datepicker";
import FormInvalidInputWarning  from '../../_Common/FormInvalidInputWarning'

const StudentChallengeEntryForm = (props) => {

    const {challenge_entry_id, challenge_id, student_id, record, entry_date, notes} = props.challengeEntry
    const lists = {
        student: props.students,
        challenge: props.challenges
    }

    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputWarning  message={message}/> : <FormInvalidInputWarning  hidden={true} message={message}/>
    }

    const handleBlur = e  => {
        props.updateInvalidInputs(e.target.name, e.target.value)
    }

    const handleDateBlur = e  => {
        const date = new Date(e.target.value)
        props.updateInvalidInputs('entry_date', date)
    }

    const handleTimeBlur = e => {
        props.updateInvalidInputs('record', record)     
    }

    const renderOptions = (listName) => {
        return lists[listName].map(key => {
            let displayValue
            listName === 'student' ? displayValue = `${key.first_name} ${key.last_name}` : displayValue = key.challenge_name
            const listItemID = key[`${listName}_id`]
            return(
            <option value={listItemID} key={`${listName}-${listItemID}`}>{displayValue}</option>
            )
        })   
    }

    const renderUnitsInput = () => {
        const selectedChallengeID = parseInt(props.challengeEntry.challenge_id)
        const selectedChallenge = lists.challenge.filter(key => key.challenge_id === selectedChallengeID)[0]
        return  selectedChallenge.units === 'seconds' ? renderTimeUnitsInput() : renderDefaultUnitsInput(selectedChallenge) 
    }

    const renderTimeUnitsInput = () => {
        const minutes = Math.floor(record / 60);
        const seconds = record % 60;

        return (
            <>
            <label htmlFor='record'>Min</label>
            <div className='input-wrapper'>
                <input 
                id='record'
                type='number' 
                name='minutes'
                value={minutes === 0 ? "" : minutes} 
                onChange={e => props.handleTimeChange('minutes', e.target.value)}
                onBlur={(e) => handleTimeBlur(e)}
                />
            </div>
            <label htmlFor='record'>Sec</label>
            <div className='input-wrapper'>
                <input 
                id='record'
                min='0'
                max='59'
                type='number' 
                name='seconds'
                value={seconds === 0 ? "" : seconds} 
                onChange={e => validateSeconds(e)}
                onBlur={(e) => handleTimeBlur(e)}
                />
                {isInputValid('record')}
            </div>
            </> 
        )
    }

    const validateSeconds = (e) => {
        return parseInt(e.target.value) < 60 || e.target.value === "" ? props.handleTimeChange('seconds', e.target.value) : null 
    }

    const renderDefaultUnitsInput = (selectedChallenge)=> {
        return (
            <>
            <label htmlFor='record'>{selectedChallenge.units}</label>
            <div className='input-wrapper'>
                <input 
                id='record'
                type='number' 
                name='record'
                value={record} 
                onChange={e => props.handleChange(e)}
                onBlur={(e) => handleBlur(e)}
                />
                {isInputValid('record')}
            </div>
            </>
        )
    }

    return(
    <main>
        <form className='student-form-challenge-entry'>
            <fieldset>
            <legend>
                    <h2>Challenge Entry</h2>
                </legend>
                <section className='inputs-section'>
                    <label>Student</label>
                    <div className='input-wrapper'>
                        <select name='student_id' value={student_id} onChange={e=>props.handleChange(e)}>
                        <option value={""} disabled>-</option>
                        {renderOptions('student')}
                        </select>
                        {isInputValid('student_id')}            
                    </div>
                    <label>Challenge</label>
                    <div className='input-wrapper'>
                        <select name='challenge_id' value={challenge_id} onChange={e=>props.handleChange(e)}>
                        <option value={""} disabled>-</option>
                        {renderOptions('challenge')}
                        </select>
                        {isInputValid('challenge_id')}            
                    </div>
                    <label htmlFor='entryDate'>Date</label>
                    <div className='input-wrapper'>
                        <DatePicker 
                        id='entryDate'
                        selected={entry_date ? entry_date : null}
                        onChange={date => props.handleDateChange(date)}
                        onBlur={(e) => handleDateBlur(e)}
                        />
                        {isInputValid('entry_date')}
                    </div>
                    {props.challengeEntry.challenge_id ? renderUnitsInput(): null}
                    <label className='label-textarea' htmlFor='notes'>Notes</label>
                    <div className='input-wrapper'>
                        <textarea 
                        name='notes'
                        id='notes'
                        value={notes} 
                        onChange={e=>props.handleChange(e)}/>
                    </div>
                </section>
                <section className='button-section'>
                    {challenge_entry_id ? 
                    <button className='button-delete' onClick={(e) => props.handleDelete(e)}>Delete</button> : null}
                    <button className='button-save' onClick={e => props.handleSave(e)}>Save</button>
                </section>
            </fieldset>
        </form>
    </main>
    )
}

export default StudentChallengeEntryForm