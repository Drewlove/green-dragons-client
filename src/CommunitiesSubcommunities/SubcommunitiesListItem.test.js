import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import SubcommunitiesListItem from './SubcommunitiesListItem'

const subcommunity = {
    subcommunity_name: 'subcommunity name', 
    subcommunity_id: 1, 
    community_id: 1
}

describe('SubcommunitiesListItem', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <SubcommunitiesListItem subcommunity={subcommunity} key={subcommunity.subcommunity_id}/>
            </BrowserRouter>, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})
