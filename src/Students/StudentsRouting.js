import React from 'react'
import {Route} from 'react-router-dom'
import StudentsListContainer from './StudentsListContainer'
import StudentFormProfile from './StudentFormsProfileAndCommunities/StudentFormProfile'
import StudentFormCommunities from './StudentFormsProfileAndCommunities/StudentFormCommunities'
import StudentChallengesListContainer from './StudentChallenges/StudentChallengesListContainer'
import StudentChallengeEntriesListContainer from './StudentChallenges/StudentChallengeEntriesListContainer'
import StudentChallengeEntryForm from './StudentChallenges/StudentChallengeEntryForm'
import StudentDragonBucksList from './StudentDragonBucks/StudentDragonBucksListContainer'
import StudentDragonBucksForm from './StudentDragonBucks/StudentDragonBucksForm'

const StudentsRouting = (props) => {

    const rootPath = `/students/:student_id`
    return(
    <>
        <Route exact path='/students/' component={StudentsListContainer} />
        <Route path={`${rootPath}/profile`} component={StudentFormProfile}/>
        <Route path={`${rootPath}/communities`} component={StudentFormCommunities}/>
        <Route exact path={`${rootPath}/challenges/`} component={StudentChallengesListContainer}/>
        <Route path={`${rootPath}/challenges/:challenges_id`} component={StudentChallengeEntriesListContainer}/>
        <Route path={`${rootPath}/student-challenges/:Student_challenges_id`} component={StudentChallengeEntryForm}/>
        <Route exact path={`${rootPath}/dragon-bucks/`} component={StudentDragonBucksList}/>
        <Route path={`${rootPath}/student-dragon-bucks/:dragon_bucks_id`} component={StudentDragonBucksForm}/>
    </> 
    )
}

export default StudentsRouting


