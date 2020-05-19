import React from 'react'

const AboutPage = () => {
    return(
        <>
        <h1 className='home-page-header'>Green Dragons App</h1>
        <main className='home-page-main'>
            <h2>Who is it for?</h2>
            <p>The administrative staff at <a className='home-page-link' href='https://www.greendragonsinc.com/'>Green Dragons Inc.</a></p>
            <br></br>
            <h2>What does it do?</h2>
            <p>The app consolidates student information and other dynamic pieces of the Green Dragons Program.</p>
            <br></br>
            <p>Admin can create, edit, and delete communities, subcommunities, challenges, students, and the following student information:</p>            
            <ul className='home-page-list'>
                        <li>Profiles</li>
                        <li>Communities</li>
                        <li>Transactions</li>
                        <li>Challenge Entries</li>
            </ul>
        </main>
        </>
    )
}

export default AboutPage