import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'

const StudentNavTabs = (props) => {
    const rootPath= `/students/${props.match.params.student_id}`

        return(
            <section className='student-nav-tabs-section'>
                <NavLink activeClassName='active' to={`${rootPath}/profile`}>Profile</NavLink>
                <NavLink activeClassName='active' to={`${rootPath}/communities`}>Communities</NavLink>
                <NavLink activeClassName='active' to={`${rootPath}/challenges`}>Challenges</NavLink>
                <NavLink activeClassName='active' to={`${rootPath}/exchanges`}>Dragon Bucks</NavLink>
            </section>
        )
}

export default withRouter(StudentNavTabs)