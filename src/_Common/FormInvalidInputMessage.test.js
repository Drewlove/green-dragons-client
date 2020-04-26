import React from 'react'
import ReactDOM from 'react-dom'
import FormInvalidInputMessage from './FormInvalidInputMessage'

describe('FormInvalidInputMessage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <FormInvalidInputMessage />, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})