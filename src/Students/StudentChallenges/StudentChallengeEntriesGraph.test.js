import React from 'react'
import ReactDOM from 'react-dom'
import StudentChallengeEntriesGraph from './StudentChallengeEntriesGraph'
import Chart from 'chart.js'

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

const chartRef = React.createRef()

describe('StudentChallengeEntriesGraph', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
                <StudentChallengeEntriesGraph 
                challengeEntries={challengeEntries}
                // chartRef={chartRef} 
                // Chart={Chart}
                />, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})