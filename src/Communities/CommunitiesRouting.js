import React from 'react'
import {Route, Switch} from 'react-router-dom'
import CommunitiesListContainer from './CommunitiesListContainer'
import CommunityFormContainer from './CommunityFormContainer'
import SubcommunityFormContainer from '../CommunitiesSubcommunities/SubcommunityFormContainer'

const CommunitiesRouting = () => {
    return(
        <Switch>
            <Route path='/communities/subcommunities/:rowId' component={SubcommunityFormContainer} />
            <Route path='/communities/:rowId' component={CommunityFormContainer} />
            <Route path='/communities' component={CommunitiesListContainer} />
        </Switch>
        )
    }

export default CommunitiesRouting