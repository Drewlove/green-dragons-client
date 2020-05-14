import React from 'react'
import {Route} from 'react-router-dom'
// import StudentsListContainer from '../StudentsList/StudentsListContainer'
// import StudentFormProfileContainer from '../StudentProfile/StudentFormProfileContainer'
// import StudentFormSubcommunitiesContainer from '../StudentSubcommunities/StudentFormSubcommunitiesContainer'
// import StudentChallengesListContainer from '../StudentChallenges/StudentChallengesListContainer'
// import StudentChallengeEntriesListContainer from '../StudentChallenges/StudentChallengeEntriesListContainer'
// import StudentChallengeEntryFormContainer from '../StudentChallenges/StudentChallengeEntryFormContainer'
// import StudentExchangessList from '../StudentExchanges/StudentExchangesListContainer'
// import StudentExchangeFormContainer from '../StudentExchanges/StudentExchangeFormContainer'

const StudentsRouting = (props) => {
    const rootPath = `/students/:rowId`
    return(
    <>
        {/* <Route exact path='/students/' component={StudentsListContainer} />
        <Route path={`${rootPath}/profile`} component={StudentFormProfileContainer}/>
        <Route path={`${rootPath}/communities`} component={StudentFormSubcommunitiesContainer}/>
        <Route exact path={`${rootPath}/challenges/`} component={StudentChallengesListContainer}/>
        <Route path={`${rootPath}/challenges/:challengeId`} component={StudentChallengeEntriesListContainer}/>
        <Route path={`${rootPath}/challenge-entries/:challengeEntryId`} component={StudentChallengeEntryFormContainer}/>
        <Route exact path={`${rootPath}/exchanges/`} component={StudentExchangessList}/>
        <Route path={`${rootPath}/exchanges/:exchangeRowId`} component={StudentExchangeFormContainer}/> */}
    </> 
    )
}

export default StudentsRouting


