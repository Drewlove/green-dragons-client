import React from 'react'
import ReactDOM from 'react-dom'
import FormSaveDeleteButtons from './FormSaveDeleteButtons'

describe('FormSaveDeleteButtons', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <FormSaveDeleteButtons />, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})