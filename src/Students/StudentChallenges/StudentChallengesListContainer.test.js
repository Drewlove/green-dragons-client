import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import StudentChallengesListContainer from './StudentChallengesListContainer'

const studentChallengesList = [
    {name: 'Challenge 1', challenges_id: 1}, 
    {name: 'Challenge 2', challenges_id: 2},
    {name: 'Challenge 3', challenges_id: 3},
    {name: 'Challenge 4', challenges_id: 4}  
]

const tableName = 'challenges'

describe('Student Challenges List Container', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <StudentChallengesListContainer studentChallengesList={studentChallengesList} tableName={tableName}/>
            </BrowserRouter>, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})
