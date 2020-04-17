import React from 'react'

const StudentDragonBucksForm = () => {
    return(
    <main>
        <form className='student-dragon-bucks-form'>
            <fieldset>
                <legend>
                    <h2>Dragon Bucks</h2>
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
                    <label>Amount</label>
                    <input type='number'/>
                </div>
                <div className='input-wrapper'>
                    <label>Date</label>
                    <input type='text'/>
                </div>
                <div className='input-wrapper'>
                    <label>Notes</label>
                    <textarea />
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

export default StudentDragonBucksForm