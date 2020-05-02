import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ChallengesListContainer from './ChallengesListContainer'
import ChallengeFormContainer from './ChallengeFormContainer'

const ChallengesRouting = () => {
    return(
        <Switch>
            <Route path='/challenges/:rowId' component={ChallengeFormContainer} />
            <Route path='/challenges' component={ChallengesListContainer} />
        </Switch>
        )
    }

export default ChallengesRouting