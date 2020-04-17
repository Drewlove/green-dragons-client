import React from 'react'
import ReactDOM from 'react-dom'
import StudentsListItem from './StudentsListItem'

it('StudentsListItem renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <StudentsListItem />, 
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})