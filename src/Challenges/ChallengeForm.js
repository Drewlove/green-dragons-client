import React from 'react'
import FormInvalidInputWarning from '../_Common/FormInvalidInputWarning'

const ChallengeForm = (props) => {
    const {challenge_id, challenge_name, challenge_description, units} = props.challenge
    
    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputWarning message={message}/> : <FormInvalidInputWarning hidden={true} message={message}/>
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
                {isInputValid('units')}
            </div>
            </>
        )
    }

    return(
    <main>
        <form className='challenge-types-form'>
            <fieldset>
            <legend>
                <h2>Challenge</h2>
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
                {isInputValid('challenge_name')}
            </div>
            <label className='label-textarea' htmlFor='task'>Task</label>
            <div className='input-wrapper'>
                <textarea id='task' 
                rows='5' 
                name='challenge_description' 
                onChange={e=>props.handleChange(e)}
                value={challenge_description}
                onBlur={(e) => handleBlur(e)}></textarea>
                {isInputValid('challenge_description')}            
            </div>
            <label>Units</label>
            <div className='input-wrapper'>
                <input id='time' className='input-radio' type='radio' name='units' onChange={e=> props.handleChange(e)} value='time' checked={units === 'time' ? true : false}/>
                <label htmlFor='time'>Time</label>
                <input id='other' className='input-radio' type='radio' name='units' onChange={e=> props.handleChange(e)} value='' checked={units !== 'time' ? true : false}/>
                <label htmlFor='other'>Other</label>            
            </div>
            {units === 'time' ? null : renderUnitNameInput()}
            </section>
            <section className='button-section'>
                {challenge_id ? 
                <button className='button-delete' onClick={(e) => props.handleDelete(e)}>Delete</button> : null}
                <button className='button-save' onClick={e => props.handleSave(e)}>Save</button>
            </section>
            </fieldset>
        </form>
    </main>
    )
}

export default ChallengeForm