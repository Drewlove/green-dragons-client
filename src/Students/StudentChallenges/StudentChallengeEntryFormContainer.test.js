import React from 'react'
import ReactDOM from 'react-dom'
import StudentChallengeEntryFormContainer from './StudentChallengeEntryFormContainer'

describe('StudentChallengeEntryFormContainer', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentChallengeEntryFormContainer />,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})