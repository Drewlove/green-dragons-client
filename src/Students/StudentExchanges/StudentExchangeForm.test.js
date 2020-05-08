import React from 'react'
import ReactDOM from 'react-dom'
import StudentExchangeForm from './StudentExchangeForm'

const exchange = 
{
    exchange_id: 1,
    exchange_date: new Date('11-11-1980'),
    student_id: 1,
    amount: "1.00",
    note: 'Note is'
}

const students = [
    {first_name: 'Jon', last_name: 'Doe', student_id: 1},
    {first_name: 'Jane', last_name: 'Doe', student_id: 2}
]

const invalidInputs = []

describe('StudentExchangeForm', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <StudentExchangeForm exchange={exchange} students={students} invalidInputs={invalidInputs}/>, 
            div
        )
        ReactDOM.unmountComponentAtNode(div)
    })
})
