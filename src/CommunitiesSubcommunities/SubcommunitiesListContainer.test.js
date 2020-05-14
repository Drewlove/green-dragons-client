import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import SubcommunitiesListContainer from './SubcommunitiesListContainer'

const subcommunities = [
    {subcommunity_name: 'subcommunity 1', subcommunity_id: 11, community_id: 1},
    {subcommunity_name: 'subcommunity 2', subcommunity_id: 12, community_id: 1},
    {subcommunity_name: 'subcommunity 3', subcommunity_id: 13, community_id: 1},
]

describe('SubcommunitiesListContainer', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <SubcommunitiesListContainer subcommunities={subcommunities}/> 
            </BrowserRouter>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})
