import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import Modal from './Modal'
import NewButtonModalContent from './NewButtonModalContent'

class Nav extends Component{
    state = {
        displayModal: false, 
        displayMenu: false, 
    }

    toggleModalDisplay(){
        const displayModal = !this.state.displayModal
        this.setState({displayModal})
    }

    handleClick(e){
        const displayMenu = !this.state.displayMenu
        this.setState({displayMenu})
    }

    getClassName(){
        return this.state.displayMenu === true ? 'nav-display-menu' : ''
    }

    render(){
        return(
            <nav className={this.getClassName()}>
                <button className='nav-hamburger-button' onClick={e => this.handleClick(e)}>
                    <div className='nav-hamburger top'></div>
                    <div className='nav-hamburger middle'></div>
                    <div className='nav-hamburger bottom'></div>
                </button>
                <section className='nav-links-wrapper'>
                    <NavLink onClick={e => this.handleClick(e)} to='/home'>Home</NavLink>
                    <NavLink onClick={e => this.handleClick(e)} to='/challenges'>Challenges</NavLink>
                    <NavLink onClick={e => this.handleClick(e)} to='/communities'>Communities</NavLink>
                    <NavLink onClick={e => this.handleClick(e)} to='/students'>Students</NavLink>
                    <button className='nav-new-button' onClick={() => this.toggleModalDisplay()}>New</button>
                    {this.state.displayModal ? 
                    <Modal toggleModalDisplay={() => this.toggleModalDisplay()}>
                        <NewButtonModalContent  toggleModalDisplay={() => this.toggleModalDisplay()}/>
                    </Modal> 
                    : null}
                </section>
            </nav>  
        )
    }
} 

export default withRouter(Nav)