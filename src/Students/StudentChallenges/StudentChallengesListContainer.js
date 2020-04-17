import React from 'react'
import {withRouter} from 'react-router-dom'
import ListMainWrapper from '../../_Common/ListMainWrapper'

const StudentChallengesListContainer = (props) => {

    const {student_id} = props.match.params

    const studentChallengesList = [
        {name: 'Challenge 1', challenges_id: 1}, 
        {name: 'Challenge 2', challenges_id: 2},
        {name: 'Challenge 3', challenges_id: 3},
        {name: 'Challenge 4', challenges_id: 4}  
    ]

    return(
        <main>
            <ListMainWrapper 
            rootPath={`/students/${student_id}/challenges`}
            tableName='challenges'
            listData={studentChallengesList}
            propertiesToDisplay={['name']} 
            listClassName='student-challenges-list'
            />
        </main>
        )
}

export default withRouter(StudentChallengesListContainer)