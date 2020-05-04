import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import CommunitiesListItem from './CommunitiesListItem'

const community = {
    community_name: 'Community 1', community_id: 1,
}

const subcommunities = [
    {subcommunity_name: 'subcommunity 1', subcommunity_id: 11},
    {subcommunity_name: 'subcommunity 2', subcommunity_id: 12},
    {subcommunity_name: 'subcommunity 3', subcommunity_id: 13}
] 

describe('CommunitiesListItem', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(        
            <BrowserRouter>
                <CommunitiesListItem community={community} subcommunities={subcommunities}/>
            </BrowserRouter>, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})