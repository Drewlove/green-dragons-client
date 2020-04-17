import React from 'react'
import {withRouter} from 'react-router-dom'
import ListMainWrapper from '../../_Common/ListMainWrapper'

const StudentChallengesListContainer = (props) => {

    const {student_id} = props.match.params

    const studentChallengeEntriesList = [
        {challengeName: '1/2 Mile Run', entry: '2 min 00s', date: '03/01/20', student_challenge_id: 1}, 
        {challengeName: '1/2 Mile Run', entry: '1 min 50s', date: '03/11/20', student_challenge_id: 2},
        {challengeName: '1/2 Mile Run', entry: '1 min 45s', date: '03/21/20', student_challenge_id: 3},
        {challengeName: '1/2 Mile Run', entry: '1 min 35s', date: '03/28/20', student_challenge_id: 4}  
    ]

    return(
        <>
            <header className='student-challenge-entries-challenge-title'>
                <h1>{studentChallengeEntriesList[0].challengeName}</h1>
            </header>
            <main>
            <ListMainWrapper
            rootPath={`/students/${student_id}/student-challenges`}
            tableName='student_challenge'
            listData={studentChallengeEntriesList}
            propertiesToDisplay={['date', 'entry']} 
            listClassName='student-challenge-entries-list'
            />
            </main>
        </>
        )
}

export default withRouter(StudentChallengesListContainer)