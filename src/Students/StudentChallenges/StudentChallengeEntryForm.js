import React from 'react'

const StudentChallengeEntryForm = () => {
    return(
    <main>
        <form className='student-form-challenge-entry'>
            <fieldset>
                <legend>
                    <h2>Challenge Entry</h2>
                </legend>
                <div className='input-wrapper'>
                    <label>Student</label>
                    <select>
                        <option value='student-1'>student 1</option>  
                        <option value='student-2'>student 2</option>  
                        <option value='student-3'>student 3</option>  
                    </select>
                </div>
                <div className='input-wrapper'>
                    <label>Challenge</label>
                    <select>
                        <option value='challenge-1'>Challenge 1</option>  
                        <option value='challenge-2'>Challenge 2</option>  
                        <option value='challenge-3'>Challenge 3</option>  
                    </select>
                </div>
                <div className='input-wrapper'>
                    <label>Record</label>
                    <input type='number'/>
                </div>
                <div className='input-wrapper'>
                    <label>Date</label>
                    <input type='text'/>
                </div>
                <div className='input-wrapper'>
                    <label>Notes</label>
                    <textarea rows='5'></textarea>
                </div>
                <section className='button-wrapper'>
                    <button>Delete</button>
                    <button>Save</button>
                </section>
            </fieldset>
        </form>
    </main>
    )
}

export default StudentChallengeEntryForm