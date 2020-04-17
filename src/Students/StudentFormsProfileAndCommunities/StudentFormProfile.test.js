import React from 'react'
import ReactDOM from 'react-dom'
import StudentFormProfile from './StudentFormProfile'

describe('Student Form Profile', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentFormProfile/>,
            div 
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})