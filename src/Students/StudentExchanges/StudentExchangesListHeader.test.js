import React from 'react'
import ReactDOM from 'react-dom'
import StudentExchangesListHeader from './StudentExchangesListHeader'

describe('StudentExchangesListHeader', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentExchangesListHeader/>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})