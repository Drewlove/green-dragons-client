import React from 'react'
import FormInvalidInputWarning  from '../_Common/FormInvalidInputWarning'
import FormSaveDeleteButtons from '../_Common/FormSaveDeleteButtons'

const SubcommunityForm = (props) => {

    const {community_id, subcommunity_id, subcommunity_name} = props.subcommunity
    const {communities} = props

    const isInputValid = (inputName, message) => {
        return props.invalidInputs.indexOf(inputName) >= 0 ? 
        <FormInvalidInputWarning  message={message}/> : <FormInvalidInputWarning hidden={true}  className='visibility-hidden' message={message}/>
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
                    <h2>Subcommunity</h2>
                </legend>
                <section className='inputs-section'>
                    <label>Community</label>
                    <div className='input-wrapper'>
                        <select name='community_id' value={community_id} onChange={e=>props.handleChange(e)}>
                        <option value={""} disabled>-</option>
                        {renderCommunityOptions()}
                        </select>
                        {isInputValid('community_id', 'Please choose one')}            
                    </div>
                    <label htmlFor='subcommunityName'>Subcommunity</label>
                    <div className='input-wrapper'>
                        <input 
                        id='subcommunityName' 
                        type='text' 
                        name='subcommunity_name' 
                        value={subcommunity_name}
                        onChange={e=>props.handleChange(e)}
                        onBlur={(e) => handleBlur(e)}/>
                        {isInputValid('subcommunity_name', 'Two letters, one capital letter')}
                    </div>
                </section>
                <FormSaveDeleteButtons 
                recordId = {subcommunity_id} 
                handleDelete={e => props.handleDelete(e)} 
                handleSave={e=> props.handleSave(e)}/>
            </fieldset>
        </form>
    </main>
    )
}

export default SubcommunityForm