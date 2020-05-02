import React from 'react'
import FormInvalidInputMessage from '../_Common/FormInvalidInputMessage'

const CommunityForm = (props) => {
    const {community_id, community_name} = props.community

    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputMessage message={message}/> : <FormInvalidInputMessage className='visibility-hidden' message={message}/>
    }

    const handleBlur = e  => {
        props.updateInvalidInputs(e.target.name, e.target.value)
    }

    return(
    <main>
        <form className='community-form'>
            <fieldset>
                <legend>
                    <h2>Community</h2>
                </legend>
                <section className='inputs-section'>
                    <label htmlFor='communityName'>Name</label>
                    <div className='input-wrapper'>
                        <input 
                        id='communityName' 
                        type='text' 
                        name='community_name' 
                        value={community_name}
                        onChange={e=>props.handleChange(e)}
                        onBlur={(e) => handleBlur(e)}/>
                        {isInputValid('community_name', 'Must have two letters, at least one capital letter')}
                    </div>
                </section>
                <section className='button-section'>
                {community_id ? <button onClick={(e) => props.handleDelete(e)}>Delete</button> : null}
                <button className='save-button' onClick={e => props.handleSave(e)}>Save</button>
            </section>
            </fieldset>
        </form>
    </main>
    )
}

export default CommunityForm