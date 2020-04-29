import React from 'react'
import ReactDOM from 'react-dom'
import ChallengesListContainer from './ChallengesListContainer'

describe('Challenges List Container', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <ChallengesListContainer />,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})