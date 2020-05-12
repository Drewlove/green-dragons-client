import React from 'react'
import ReactDOM from 'react-dom'
import StudentChallengeEntryForm from './StudentChallengeEntryForm'

describe('StudentChallengeEntryForm', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentChallengeEntryForm />,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})