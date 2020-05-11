import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import StudentChallengeEntriesListContainer from './StudentChallengeEntriesListContainer'


describe('StudentChallengeEntriesListContainer', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <StudentChallengeEntriesListContainer 
                match={
                    {
                        params: {rowId: 1}
                    }
                }
                />
            </BrowserRouter>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})