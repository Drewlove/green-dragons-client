import React from 'react'

const CommunityForm = () => {
    return(
    <main>
        <form className='community-form'>
            <fieldset>
                <legend>
                    <h2>Community</h2>
                </legend>
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

export default CommunityForm