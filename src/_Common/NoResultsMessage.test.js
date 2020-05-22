import React from 'react'
import ReactDOM from 'react-dom'
import NoResultsMessage from './NoResultsMessage'

describe('ShimmerGraph', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <NoResultsMessage/>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})