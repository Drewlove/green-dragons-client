import React from 'react'
import {Route, Switch} from 'react-router-dom'
import CommunitiesListContainer from './CommunitiesListContainer'
import CommunityFormContainer from './CommunityFormContainer'
import SubcommunityForm from './SubcommunityForm'

const CommunitiesRouting = () => {
    return(
        <Switch>
            <Route path='/communities/subcommunities/:subcommunities_id' component={SubcommunityForm} />
            <Route path='/communities/:rowId' component={CommunityFormContainer} />
            <Route path='/communities' component={CommunitiesListContainer} />
        </Switch>
        )
    }

export default CommunitiesRouting