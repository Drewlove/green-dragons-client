import React, {Component} from 'react'
import UserIcon from '../Assets/user.png'
import ChallengesIcon from '../Assets/challenges.png'
import CommunitiesIcon from '../Assets/communities.png'
import {Link} from 'react-router-dom'
import config from '../config'

class UsersListContainer extends Component{

    componentDidMount(){
        const url = `${config.API_ENDPOINT}/test`
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": config.API_KEY
            }
        }
        console.log(`config.API_KEY: ${config.API_KEY},  process.env.API_KEY: ${process.env.REACT_APP_API_KEY}`)
        fetch(url, options)
        .then(res => res.json())
        .then(resJSON => console.log(resJSON))
    }

    renderUsersList(){
        const usersList = [
        {name: 'Kaitlin Keleher', id: 1}, 
        {name: 'Mike Cermak', id: 2}, 
        {name: 'Ale Cabrera-Mondragon', id: 3}
        ]

        return usersList.map(key => {
            return(
                <li key={key.id} className='users-list-item'>
                    <div className='users-list-item-name'>
                        <p>{key.name}</p>
                    </div>
                    <div className='users-list-item-links-wrapper'>
                        <Link className='users-list-item-link' to={`/users/${key.id}/profile`}>
                            <img className='users-list-item-link-icon' alt='user icon' src={UserIcon}/>
                            <p className='users-list-item-link-tooltip'>Profile</p>
                        </Link>
                        <Link className='users-list-item-link' to={`/users/${key.id}/communities`}>
                            <img className='users-list-item-link-icon' alt='communities icon' src={CommunitiesIcon}/>
                            <p className='users-list-item-link-tooltip'>Communities</p>                     
                        </Link>
                        <Link className='users-list-item-link' to={`/users/${key.id}/challenges`}>
                            <img className='users-list-item-link-icon' alt='challenges icon' src={ChallengesIcon}/>
                            <p className='users-list-item-link-tooltip'>Challenges</p>
                        </Link>
                        <Link className='users-list-item-link-transactions' to={`/users/${key.id}/dragon-bucks`}>
                            <div >$100.00</div>
                            <p className='users-list-item-link-tooltip'>Transactions</p>
                        </Link>
                    </div>
                </li>
            )
        })
    }
    
    render(){
        return(
            <main>
                <ul className='list-main-wrapper'>
                    {this.renderUsersList()}
                </ul>
            </main>
        )
    }
}

export default UsersListContainer

//     const renderUsersList = () => {
//         return usersList.map(key => {
//             return(
//                 <li key={key.id} className='users-list-item'>
//                     <div className='users-list-item-name'>
//                         <p>{key.name}</p>
//                     </div>
//                     <div className='users-list-item-links-wrapper'>
//                         <Link className='users-list-item-link' to={`/users/${key.id}/profile`}>
//                             <img className='users-list-item-link-icon' alt='user icon' src={UserIcon}/>
//                             <p className='users-list-item-link-tooltip'>Profile</p>
//                         </Link>
//                         <Link className='users-list-item-link' to={`/users/${key.id}/communities`}>
//                             <img className='users-list-item-link-icon' alt='communities icon' src={CommunitiesIcon}/>
//                             <p className='users-list-item-link-tooltip'>Communities</p>                     
//                         </Link>
//                         <Link className='users-list-item-link' to={`/users/${key.id}/challenges`}>
//                             <img className='users-list-item-link-icon' alt='challenges icon' src={ChallengesIcon}/>
//                             <p className='users-list-item-link-tooltip'>Challenges</p>
//                         </Link>
//                         <Link className='users-list-item-link-transactions' to={`/users/${key.id}/dragon-bucks`}>
//                             <div >$100.00</div>
//                             <p className='users-list-item-link-tooltip'>Transactions</p>
//                         </Link>
//                     </div>
//                 </li>
//             )
//         })
//     }
    
//     return(
//         <main>
//             <ul className='list-main-wrapper'>
//                 {renderUsersList()}
//             </ul>
//         </main>
//     )
// }
