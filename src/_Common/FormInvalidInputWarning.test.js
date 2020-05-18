import React from 'react'
import ReactDOM from 'react-dom'
import FormInvalidInputWarning from './FormInvalidInputWarning'

describe('FormInvalidInputWarning', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <FormInvalidInputWarning />, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})