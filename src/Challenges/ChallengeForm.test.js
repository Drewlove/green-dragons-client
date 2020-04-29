import React from 'react'
import ReactDOM from 'react-dom'
import ChallengeForm from './ChallengeForm'

describe('Challenge Form', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <ChallengeForm />, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})
