import React from 'react'
import ReactDOM from 'react-dom'
import StudentChallengeEntryForm from './StudentChallengeEntryForm'

describe('Student Challenge Entries List wrapper', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentChallengeEntryForm />,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})