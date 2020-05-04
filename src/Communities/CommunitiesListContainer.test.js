import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import CommunitiesListContainer from './CommunitiesListContainer'

const communities = [
    {
        community_name: 'Community 1', 
        community_id: 1
    },
    {
        community_name: 'Community 2', 
        community_id: 2
    },
    {
        community_name: 'Community 3', 
        community_id: 3
    }
]

describe('CommunitiesListContainer', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <BrowserRouter>
                <CommunitiesListContainer communities={communities}/>
            </BrowserRouter>,
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})