import React from 'react'
import ReactDOM from 'react-dom'
import ShimmerGraph from './ShimmerGraph'

describe('ShimmerGraph', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <ShimmerGraph/>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})