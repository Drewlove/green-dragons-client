import React from 'react'
import FormInvalidInputWarning  from '../_Common/FormInvalidInputWarning'
import FormSaveDeleteButtons from '../_Common/FormSaveDeleteButtons'

const CommunityForm = (props) => {
    const {community_id, community_name} = props.community

    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputWarning  message={message}/> : <FormInvalidInputWarning hidden={true}  className='visibility-hidden' message={message}/>
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
                        {isInputValid('community_name', 'Two letters, one capital letter')}
                    </div>
                </section>
                <FormSaveDeleteButtons 
                recordId = {community_id} 
                handleDelete={e => props.handleDelete(e)} 
                handleSave={e=> props.handleSave(e)}/>
            </fieldset>
        </form>
    </main>
    )
}

export default CommunityForm