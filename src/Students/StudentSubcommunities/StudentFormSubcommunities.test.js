import React from 'react'
import ReactDOM from 'react-dom'
import StudentFormSubcommunities from './StudentFormSubcommunities'

const communities = []
const subcommunities = []
const mergedCommunities = {}

describe('StudentFormSubcommunities', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentFormSubcommunities 
            communities={communities} 
            subcommunities={subcommunities}
            mergedCommunities={mergedCommunities}/>, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})