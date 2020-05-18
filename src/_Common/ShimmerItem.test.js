import React from 'react'
import ReactDOM from 'react-dom'
import ShimmerItem from './ShimmerItem'

describe('ShimmerItem', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <ShimmerItem/>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})