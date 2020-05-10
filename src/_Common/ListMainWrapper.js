import React from 'react'
import ListMainItem from './ListMainItem'

const ListMainWrapper = (props) => { 
    const renderList = (listData) => {
        return listData.map(listItem => {
            const tableRowId = listItem[`${props.tableName}_id`]
            console.log(`${props.rootPath}/${tableRowId}`)
            return (
            <ListMainItem key={tableRowId} path={`${props.rootPath}/${tableRowId}`}>
                {displayText(listItem)}
            </ListMainItem>
            )
        })
    }

    const displayText = (listItem) => {
        return props.propertiesToDisplay.map(key => {
            return(
                <div className={isAmountNegative(listItem[key])}key={`${listItem.id}-${key}`}>{listItem[key]}</div>
            )
        })
    }

    const isAmountNegative = (value) => {
        return parseInt(value) < 0 ? 'negative-amount' : ''
    }
    
    return(
        <ul className={`list-main-wrapper ${props.listClassName}`}>
            {renderList(props.listData)}
        </ul>
    )
}

export default ListMainWrapper