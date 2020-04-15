import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import Modal from './Modal'
import NewButtonModalContent from './NewButtonModalContent'

class Nav extends Component{
    state = {
        displayModal: false, 
    }

    toggleModalDisplay(){
        const displayModal = !this.state.displayModal
        this.setState({displayModal})
    }

    render(){
        return(
            <nav>
                <div className='nav-wrapper'>
                <NavLink activeClassName='active' to='/home'>Home</NavLink>
                <NavLink activeClassName='active' to='/challenges'>Challenges</NavLink>
                <NavLink activeClassName='active' to='/communities'>Communities</NavLink>
                <NavLink activeClassName='active' to='/users'>Users</NavLink>
                {this.props.children}
                <button className='new-button' onClick={() => this.toggleModalDisplay()}>New</button>
                {this.state.displayModal ? 
                <Modal toggleModalDisplay={() => this.toggleModalDisplay()}>
                    <NewButtonModalContent  toggleModalDisplay={() => this.toggleModalDisplay()}/>
                </Modal> 
                : null}
                </div>
            </nav>  
        )
    }
} 

export default Nav