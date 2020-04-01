import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
    return(
        <nav>
            <section className='nav-section'>
                <Link to='/challenges'>Challenges</Link>
                <Link to='/users'>Users</Link>
                <Link to='/communities'>Communities</Link>
            </section>
        </nav>  
    )
}

export default Nav