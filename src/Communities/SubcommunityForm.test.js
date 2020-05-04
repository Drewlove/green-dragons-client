import React from 'react'
import ReactDOM from 'react-dom'
import SubcommunityForm from './SubcommunityForm'

const subcommunity={
    subcommunity_id: 1, 
    community_id: 2,
    subcommunity_name: 'subcommunity',
}

const communities = [
    {
        community_id: 1, 
        community_name: 'community 1'
    },
    {
        community_id: 2, 
        community_name: 'community 2'
    },
    {
        community_id: 3, 
        community_name: 'community 3'
    }
]

const invalidInputs = []

describe('SubcommunityForm', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <SubcommunityForm subcommunity={subcommunity} communities={communities} invalidInputs={invalidInputs}/>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})

