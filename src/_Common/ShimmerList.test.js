import React from 'react'
import ReactDOM from 'react-dom'
import ShimmerList from './ShimmerList'

describe('ShimmerList', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <ShimmerList/>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})