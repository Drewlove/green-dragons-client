import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import StudentChallengeEntriesGraph from './StudentChallengeEntriesGraph'

const challengeEntries = [
    {
        challenge_entry_id: 1,
        challenge_id: 1,
        student_id: 1,
        record: 10,
        entry_date: '01/01/2000',
        notes: '',
    },
    {
        challenge_entry_id: 2,
        challenge_id: 1,
        student_id: 1,
        record: 20,
        entry_date: '01/02/2000',
        notes: '',
    },
    {
        challenge_entry_id: 3,
        challenge_id: 1,
        student_id: 1,
        record: 30,
        entry_date: '01/03/2000',
        notes: '',
    }
]



describe('StudentChallengeEntriesGraph', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <StudentChallengeEntriesGraph challengeEntries={challengeEntries}/>
            </BrowserRouter>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})