import React from 'react'
import ReactDOM from 'react-dom'
import StudentDragonBucksForm from './StudentDragonBucksForm'

describe('Dragon Busk Form', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentDragonBucksForm />, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})
