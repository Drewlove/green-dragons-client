import React from 'react'
import ReactDOM from 'react-dom'
import StudentChallengeEntriesGraph from './StudentChallengeEntriesGraph'

describe('StudentChallengeEntriesGraph', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <StudentChallengeEntriesGraph />, 
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})