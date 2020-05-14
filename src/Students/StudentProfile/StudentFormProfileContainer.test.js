import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import StudentFormProfileContainer from './StudentFormProfileContainer'


describe('StudentFormProfileContainer', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <StudentFormProfileContainer/>
            </BrowserRouter>,
            div 
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})