import React from 'react'
import ReactDOM from 'react-dom'
import StudentFormCommunities from './StudentFormCommunities'

describe('Student Form Communities', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentFormCommunities/>, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})