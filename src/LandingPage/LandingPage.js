import React from 'react'
import Logo from '../Assets/Green-Dragons-Logo.png'

const LandingPage = () => {
    return(
        <>
            <header>
                <h1>Green Dragons App</h1>
            </header>
            <img className='landing-page-image'src={Logo} />
        </>
    )
}

export default LandingPage