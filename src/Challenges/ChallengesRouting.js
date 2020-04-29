import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ChallengesListContainer from './ChallengesListContainer'
import ChallengeForm from './ChallengeForm'

const ChallengesRouting = () => {
    return(
        <Switch>
            <Route path='/challenges/:challenge_id' component={ChallengeForm} />
            <Route path='/challenges' component={ChallengesListContainer} />
        </Switch>
        )
    }

export default ChallengesRouting