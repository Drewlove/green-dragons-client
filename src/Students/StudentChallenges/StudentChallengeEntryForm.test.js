import React from 'react'
import ReactDOM from 'react-dom'
import StudentChallengeEntryForm from './StudentChallengeEntryForm'

const challengeEntry = {
    challenge_entry_id: '',
     challenge_id: '',
     student_id: '',
     record: '',
     entry_date: '',
     notes: ''
}

const students = []

const challenges = []

const invalidInputs = []

describe('StudentChallengeEntryForm', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentChallengeEntryForm 
            challengeEntry={challengeEntry} 
            students = {students} 
            challenges={challenges}
            invalidInputs={invalidInputs}/>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})