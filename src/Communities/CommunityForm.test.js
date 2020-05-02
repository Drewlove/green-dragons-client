import React from 'react'
import ReactDOM from 'react-dom'
import CommunityForm from './CommunityForm'

const community = {
    community_id: 1, 
    community_name: 'Community Name'
}

const invalidInputs = []

describe('Community Form', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <CommunityForm community={community} invalidInputs={invalidInputs}/>, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})
