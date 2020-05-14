import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import StudentFormSubcommunitiesContainer from './StudentFormSubcommunitiesContainer'

describe('StudentFormSubcommunitiesContainer', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <StudentFormSubcommunitiesContainer />
            </BrowserRouter>, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})