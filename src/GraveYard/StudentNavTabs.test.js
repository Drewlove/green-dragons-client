import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import StudentNavTabs from './StudentNavTabs'

describe('Student Nav Tabs', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <StudentNavTabs />
            </BrowserRouter>,
            div 
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})