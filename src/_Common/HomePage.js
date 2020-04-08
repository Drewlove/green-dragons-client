import React from 'react'

const HomePage = () => {
    return(
        <>
        <header>
            <h1 className='home-page-header'>Green Dragons Dashboard</h1>
        </header>
        <main className='home-page-main'>
            <p>The Green Dragons Dashboard allows administrators to:</p>
            <ul className='home-page-list'>
                <li>Create, edit, and delete communities</li>
                <li>Create, edit, and delete subcommunities</li>
                <li>Create, edit, and delete challenges</li>
                <li>Create, edit, and delete users, and perform similar actions for user:</li>
                    <ul>
                        <li>Profiles</li>
                        <li>Communities</li>
                        <li>Transactions</li>
                        <li>Challenges</li>
                    </ul>
            </ul>
        </main>
        </>
    )
}

export default HomePage