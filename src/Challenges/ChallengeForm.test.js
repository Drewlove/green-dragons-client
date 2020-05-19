import React from 'react'
import ReactDOM from 'react-dom'
import ChallengeForm from './ChallengeForm'

const challenge = {
    challenge_id: 1,
    challenge_name: 'challenge',
    challenge_description: 'Can you challenge?',
    units: 'time'
}

const invalidInputs = []

describe('Challenge Form', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <ChallengeForm challenge={challenge} invalidInputs={invalidInputs}/>, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})
