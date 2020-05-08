import React from 'react'
import ReactDOM from 'react-dom'
import StudentExchangeFormContainer from './StudentExchangeFormContainer'

describe('StudentExchangeFormContainer', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <StudentExchangeFormContainer/>, 
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})