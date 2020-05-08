import React from 'react'
import ReactDOM from 'react-dom'
import StudentExchangeForm from './StudentExchangeForm'

describe('StudentExchangeForm', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentExchangeForm />, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})
