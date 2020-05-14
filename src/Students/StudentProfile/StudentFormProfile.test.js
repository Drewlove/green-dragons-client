import React from 'react'
import ReactDOM from 'react-dom'
import StudentFormProfile from './StudentFormProfile'

const student = {
    first_name: 'Jon', 
    last_name: 'Doe',
    birthdate: '09-09-9999'
}

const invalidInputs = []

it('Student Form Profile renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <StudentFormProfile student={student} invalidInputs={invalidInputs}/>, div
    )
    ReactDOM.unmountComponentAtNode(div)
})

