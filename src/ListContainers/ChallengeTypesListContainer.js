import React from 'react'
import ListItem from '../ReusableComponents/ListItem'

const ChallengeTypesListContainer = () => {
    
    const challengesList = [
        {name: '1', path: '/challenges/challenge-1', id: 1}, 
        {name: '2', path: '/challenges/challenge-2', id: 2},
        {name: '3', path: '/challenges/challenge-3', id: 3},
        {name: '4', path: '/challenges/challenge-4', id: 4}  
    ]

    const renderList = () => {
        return challengesList.map(listItem => {
            return (
            <ListItem key={listItem.id} path={listItem.path}>
                {listItem.name}
            </ListItem>
            )
        })
    }
    
    return(
    <>
    <h1>Challenges</h1>
        {renderList()}
    </>
    )
}

export default ChallengeTypesListContainer
