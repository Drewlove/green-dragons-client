import React from 'react'
import {withRouter} from 'react-router-dom'
import ListMainWrapper from '../../_Common/ListMainWrapper'

const StudentDragonBucksListContainer = (props) => {

    const {students_id} = props.match.params
    
    const studentDragonBucksList = [
        {amount: '$25.00', date: '03/01/2020', student_dragon_bucks_id: 1}, 
        {amount: '$25.00', date: '03/11/2020', student_dragon_bucks_id: 2},
        {amount: '$25.00', date: '03/21/2020', student_dragon_bucks_id: 3},
        {amount: '$-10.00', date: '03/27/2020', student_dragon_bucks_id: 4}  
    ]
    
    return(
        <main>
            <ListMainWrapper
            rootPath={`/students/${students_id}/student-dragon-bucks`}
            tableName='student_dragon_bucks'
            listData={studentDragonBucksList}
            propertiesToDisplay={['date', 'amount']} 
            listClassName='student-dragon-bucks-list'
            />
        </main>
        )
}

export default withRouter(StudentDragonBucksListContainer)
