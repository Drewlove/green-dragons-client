import React from 'react'
import {Route} from 'react-router-dom'
import StudentsListContainer from './StudentsListContainer'
import StudentFormProfileContainer from './StudentFormsProfileAndCommunities/StudentFormProfileContainer'
import StudentFormCommunities from './StudentFormsProfileAndCommunities/StudentFormCommunities'
import StudentChallengesListContainer from './StudentChallenges/StudentChallengesListContainer'
import StudentChallengeEntriesListContainer from './StudentChallenges/StudentChallengeEntriesListContainer'
import StudentChallengeEntryForm from './StudentChallenges/StudentChallengeEntryForm'
import StudentDragonBucksList from './StudentDragonBucks/StudentDragonBucksListContainer'
import StudentDragonBucksForm from './StudentDragonBucks/StudentDragonBucksForm'

import FormContainer from '../_Common/FormContainer'

const StudentsRouting = (props) => {
    const rootPath = `/students/:rowId`
    return(
    <>
        <Route exact path='/students/' component={StudentsListContainer} />

        <Route 
        path={`${rootPath}/profile`} 
        render={props => <FormContainer {...props} tableName = 'students'/>}
        />





        <Route path={`${rootPath}/communities`} component={StudentFormCommunities}/>
        <Route exact path={`${rootPath}/challenges/`} component={StudentChallengesListContainer}/>
        <Route path={`${rootPath}/challenges/:challenges_id`} component={StudentChallengeEntriesListContainer}/>
        <Route path={`${rootPath}/student-challenges/:student_challenges_id`} component={StudentChallengeEntryForm}/>
        <Route exact path={`${rootPath}/dragon-bucks/`} component={StudentDragonBucksList}/>
        <Route path={`${rootPath}/student-dragon-bucks/:dragon_bucks_id`} component={StudentDragonBucksForm}/>
    </> 
    )
}

export default StudentsRouting


