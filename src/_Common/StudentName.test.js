import React from 'react'
import ReactDOM from 'react-dom'
import StudentName from './StudentName'

describe('StudentName', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentName/>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})