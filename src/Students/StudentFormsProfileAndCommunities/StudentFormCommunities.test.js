import React from 'react'
import ReactDOM from 'react-dom'
import studentFormCommunities from './StudentFormCommunities'

describe('student Form Communities', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <studentFormCommunities/>, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})