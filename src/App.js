import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import Nav from './_Common/Nav'
import ChallengesRouting from './Challenges/ChallengesRouting'
import CommunitiesRouting from './Communities/CommunitiesRouting'
import StudentsRouting from './Students/StudentsRouting/StudentsRouting'
import HomePage from './HomePage/HomePage'

class App extends Component{

  render(){
    return (
      <>
        <Nav />
        <Route path='/' component={HomePage} />
        <Route path='/challenges' component={ChallengesRouting} />
        <Route path='/communities' component={CommunitiesRouting} />
        <Route path='/students' component={StudentsRouting} />
      </>
      )
    }
  }


export default App
