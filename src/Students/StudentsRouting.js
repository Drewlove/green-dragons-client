import React from 'react'
import {Route} from 'react-router-dom'
import StudentsListContainer from './StudentsListContainer'
import StudentFormProfileContainer from './StudentFormsProfileAndCommunities/StudentFormProfileContainer'
import StudentFormCommunities from './StudentFormsProfileAndCommunities/StudentFormCommunities'
import StudentChallengesListContainer from './StudentChallenges/StudentChallengesListContainer'
import StudentChallengeEntriesListContainer from './StudentChallenges/StudentChallengeEntriesListContainer'
import StudentChallengeEntryForm from './StudentChallenges/StudentChallengeEntryForm'
import StudentExchangessList from './StudentExchanges/StudentExchangesListContainer'
import StudentExchangeFormContainer from './StudentExchanges/StudentExchangeFormContainer'

const StudentsRouting = (props) => {
    const rootPath = `/students/:rowId`
    return(
    <>
        <Route exact path='/students/' component={StudentsListContainer} />
        <Route path={`${rootPath}/profile`} component={StudentFormProfileContainer}/>
        <Route path={`${rootPath}/communities`} component={StudentFormCommunities}/>
        <Route exact path={`${rootPath}/challenges/`} component={StudentChallengesListContainer}/>
        <Route path={`${rootPath}/challenges/:rowId`} component={StudentChallengeEntriesListContainer}/>
        <Route path={`${rootPath}/challenges/:rowId`} component={StudentChallengeEntryForm}/>
        <Route exact path={`${rootPath}/exchanges/`} component={StudentExchangessList}/>
        <Route path={`${rootPath}/exchanges/:exchangeRowId`} component={StudentExchangeFormContainer}/>
    </> 
    )
}

export default StudentsRouting


