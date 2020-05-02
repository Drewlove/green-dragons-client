import React from 'react'
import FormInvalidInputMessage from '../_Common/FormInvalidInputMessage'

const ChallengeForm = (props) => {
    const {challenge_id, challenge_name, challenge_description, challenge_best_record, units} = props.challenge
    
    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputMessage message={message}/> : <FormInvalidInputMessage className='visibility-hidden' message={message}/>
    }

    const handleBlur = e  => {
        props.updateInvalidInputs(e.target.name, e.target.value)
    }
    const renderUnitNameInput = () => {
        return(
            <>
            <label htmlFor='unitName'>Unit Name</label>
            <div className='input-wrapper'>
                <input id='unitName' 
                type='text' 
                name='units' 
                onChange={e=>props.handleChange(e)}
                value={units}
                onBlur={(e) => handleBlur(e)}/>
                {isInputValid('units', 'Must have two letters, at least one capital letter')}
            </div>
            </>
        )
    }

    return(
    <main>
        <form className='challenge-types-form'>
            <fieldset>
            <legend>
                <h2>Challenge Type</h2>
            </legend>
            <section className='inputs-section'>           
            <label htmlFor='name'>Name</label>
            <div className='input-wrapper'>
                <input id='name' 
                type='text' 
                name='challenge_name' 
                onChange={e=>props.handleChange(e)}
                value={challenge_name}
                onBlur={(e) => handleBlur(e)}/>
                {isInputValid('challenge_name', 'Must have two letters, at least one capital letter')}
            </div>
            <label htmlFor='description'>Description</label>
            <div className='input-wrapper'>
                <textarea id='description' 
                rows='5' 
                name='challenge_description' 
                onChange={e=>props.handleChange(e)}
                value={challenge_description}
                onBlur={(e) => handleBlur(e)}></textarea>
                {isInputValid('challenge_description', 'Must have two letters, at least one capital letter')}            
            </div>
            <label>Units</label>
            <div className='input-wrapper'>
                <input id='time' className='input-radio' type='radio' name='units' onChange={e=> props.handleChange(e)} value='time' checked={units === 'time' ? true : false}/>
                <label htmlFor='time'>Time</label>
                <input id='other' className='input-radio' type='radio' name='units' onChange={e=> props.handleChange(e)} value='' checked={units !== 'time' ? true : false}/>
                <label htmlFor='other'>Other</label>            
            </div>
            {units === 'time' ? null : renderUnitNameInput()}
            <label>Best Record</label>
            <div className='input-wrapper'>
                <select name='challenge_best_record' value={challenge_best_record} onChange={e=>props.handleChange(e)}>
                <option value={""} disabled>-</option>
                <option value='highest'>Highest</option>  
                <option value='lowest'>Lowest</option>  
                </select>
                {isInputValid('challenge_best_record', 'Please choose one')}            
            </div>
            </section>
            <section className='button-section'>
                {challenge_id ? <button onClick={(e) => props.handleDelete(e)}>Delete</button> : null}
                <button className='save-button' onClick={e => props.handleSave(e)}>Save</button>
            </section>
            </fieldset>
        </form>
    </main>
    )
}

export default ChallengeForm