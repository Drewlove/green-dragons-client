import React from 'react'
import FormInvalidInputMessage from '../_Common/FormInvalidInputMessage'

const SubcommunityForm = (props) => {

    const {community_id, subcommunity_id, subcommunity_name} = props.subcommunity
    const {communities} = props

    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputMessage message={message}/> : <FormInvalidInputMessage className='visibility-hidden' message={message}/>
    }

    const handleBlur = e  => {
        props.updateInvalidInputs(e.target.name, e.target.value)
    }

    const renderCommunityOptions = () => {
        return communities.map(key => {
            return(
            <option value={key.community_id} key={key.community_id}>{key.community_name}</option>
            )
        })   
    }

    return(
    <main>
        <form className='subcommunity-form'>
            <fieldset>
                <legend>
                    <h2>Subommunity</h2>
                </legend>
                <section className='inputs-section'>
                    <label>Communities</label>
                    <div className='input-wrapper'>
                        <select name='community_id' value={community_id} onChange={e=>props.handleChange(e)}>
                        <option value={""} disabled>-</option>
                        {renderCommunityOptions()}
                        </select>
                        {isInputValid('community_id', 'Please choose one')}            
                    </div>
                    <label htmlFor='subcommunityName'>Name</label>
                    <div className='input-wrapper'>
                        <input 
                        id='subcommunityName' 
                        type='text' 
                        name='subcommunity_name' 
                        value={subcommunity_name}
                        onChange={e=>props.handleChange(e)}
                        onBlur={(e) => handleBlur(e)}/>
                        {isInputValid('subcommunity_name', 'Must have at least one letter')}
                    </div>
                </section>
                <section className='button-section'>
                    {subcommunity_id ? <button onClick={(e) => props.handleDelete(e)}>Delete</button> : null}
                    <button className='save-button' onClick={e => props.handleSave(e)}>Save</button>
                </section>
            </fieldset>
        </form>
    </main>
    )
}

export default SubcommunityForm