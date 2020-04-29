import React from 'react'
import ListMainWrapper from '../_Common/ListMainWrapper'

const ChallengeListContainer = () => {
    
    const challengesList = [
        {name: 'Challenge 1', challenges_id: 1}, 
        {name: 'Challenge 2', challenges_id: 2},
        {name: 'Challenge 3', challenges_id: 3},
        {name: 'Challenge 4', challenges_id: 4},
        {name: 'Challenge 5', challenges_id: 5},
        {name: 'Challenge 6', challenges_id: 6},
        {name: 'Challenge 7', challenges_id: 7},
        {name: 'Challenge 8', challenges_id: 8},
        {name: 'Challenge 9', challenges_id: 9}, 
        {name: 'Challenge 10', challenges_id: 10},
    ]

    return(
        <>
        <main>
            <ListMainWrapper 
            rootPath='/challenges'
            tableName='challenges'
            listData={challengesList}
            propertiesToDisplay={['name']} 
            listClassName='challenges-list'
            />
        </main>
        </>
    )
}

export default ChallengeListContainer
