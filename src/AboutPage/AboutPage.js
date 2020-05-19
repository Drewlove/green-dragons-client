import React from 'react'

const AboutPage = () => {
    return(
        <>
        <h2 className='home-page-header'>Green Dragons App</h2>
        <main className='home-page-main'>
            <p>This app is a prototype made for the administrative staff of <a className='home-page-link' href='https://www.greendragonsinc.com/'>Green Dragons Inc.</a></p>
            <br></br>
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