import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import StudentsListItem from './StudentsListItem'

const student = {
    first_name: 'Mike', 
    last_name: 'Cermak', 
    birth_date: '1980-09-01'
} 

it('StudentsListItem renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <StudentsListItem student={student}/>
        </BrowserRouter>, 
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})