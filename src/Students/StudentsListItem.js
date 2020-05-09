import React from 'react'
import studentIcon from '../Assets/student.png'
import ChallengesIcon from '../Assets/challenges.png'
import CommunitiesIcon from '../Assets/communities.png'
import {Link} from 'react-router-dom'
const StudentsListItem = (props) => {
    const {first_name, last_name, student_id} = props.student
    return(
        <li className='students-list-main-item'>
        <div className='students-list-item-name'>
            <p>{first_name} {last_name}</p>
        </div>
        <Link className='students-list-item-link' to={`/students/${student_id}/profile`}>
            <img className='students-list-item-link-icon' alt='student icon' src={studentIcon}/>
            <p className='students-list-item-link-tooltip'>Profile</p>
        </Link>
        <Link className='students-list-item-link' to={`/students/${student_id}/communities`}>
            <img className='students-list-item-link-icon' alt='communities icon' src={CommunitiesIcon}/>
            <p className='students-list-item-link-tooltip'>Communities</p>                     
        </Link>
        <Link className='students-list-item-link' to={`/students/${student_id}/challenges`}>
            <img className='students-list-item-link-icon' alt='challenges icon' src={ChallengesIcon}/>
            <p className='students-list-item-link-tooltip'>Challenges</p>
        </Link>
        <Link className='students-list-item-link' to={`/students/${student_id}/exchanges`}>
            <div className='students-list-item-link-exchanges'>$100.00</div>
            <p className='students-list-item-link-tooltip'>Transactions</p>
        </Link>
    </li>
    )
}

// const StudentsListItem = (props) => {
//     const {first_name, last_name, student_id} = props.student
//     return(
//         <li className='students-list-main-item'>
//         <div className='students-list-item-name'>
//             <p>{first_name} {last_name}</p>
//         </div>
//         <div className='students-list-item-links-wrapper'>
//             <Link className='students-list-item-link' to={`/students/${student_id}/profile`}>
//                 <img className='students-list-item-link-icon' alt='student icon' src={studentIcon}/>
//                 <p className='students-list-item-link-tooltip'>Profile</p>
//             </Link>
//             <Link className='students-list-item-link' to={`/students/${student_id}/communities`}>
//                 <img className='students-list-item-link-icon' alt='communities icon' src={CommunitiesIcon}/>
//                 <p className='students-list-item-link-tooltip'>Communities</p>                     
//             </Link>
//             <Link className='students-list-item-link' to={`/students/${student_id}/challenges`}>
//                 <img className='students-list-item-link-icon' alt='challenges icon' src={ChallengesIcon}/>
//                 <p className='students-list-item-link-tooltip'>Challenges</p>
//             </Link>
//             <Link className='students-list-item-link' to={`/students/${student_id}/exchanges`}>
//                 <div className='students-list-item-link-exchanges'>$100.00</div>
//                 <p className='students-list-item-link-tooltip'>Transactions</p>
//             </Link>
//         </div>
//     </li>
//     )
// }

export default StudentsListItem