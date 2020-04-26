import React from 'react'

const SubcommunityForm = () => {
    return(
    <main>
        <form className='subcommunity-form'>
            <fieldset>
                <legend>
                    <h2>Subommunity</h2>
                </legend>
                <div className='input-wrapper'>
                    <label>Community</label>
                    <select>
                        <option value='community-1'>Community 1</option>  
                        <option value='community-2'>Community 2</option>  
                        <option value='community-3'>Community 3</option>  
                    </select>
                </div>
                <div className='input-wrapper'>
                    <label>Name</label>
                    <input type='text'/>
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

export default SubcommunityForm