import React from 'react'

const ChallengeTypeForm = () => {
    return(
    <main>
        <form className='challenge-types-form'>
            <fieldset>
            <legend>
                <h2>Challenge Type</h2>
            </legend>
            <div className='input-wrapper'>
                <label>Name</label>
                <input type='text'/>
            </div>
            <div className='input-wrapper'>
                <label>Description</label>
                <textarea rows='5'></textarea>
            </div>
            <div className='input-wrapper'>
                <label>Units</label>
                <div className='radio-wrapper'>
                    <input className='radio' type='radio' name='units' value='time'/>Time
                    <input className='radio' type='radio' name='units' value='other'/>Other
                </div>
            </div>
            <div className='input-wrapper'>
                <label>Unit Name</label>
                <input type='text'/>
            </div>
            <div className='input-wrapper'>
                <label>Best Record</label>
                <select>
                <option value='highest'>Highest</option>  
                <option value='lowest'>Lowest</option>  
                </select>
            </div>
            <section className='button-section'>
                <button>Delete</button>
                <button>Save</button>
            </section>
            </fieldset>
        </form>
    </main>
    )
}

export default ChallengeTypeForm