import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import Nav from './_Common/Nav'
import ChallengesRouting from './ChallengeTypes/ChallengeTypesRouting'
import CommunitiesRouting from './Communities/CommunitiesRouting'
import StudentsRouting from './Students/StudentsRouting'
import HomePage from './_Common/HomePage'

class App extends Component{

  render(){
    return (
      <>
        <Nav />
        <Route path='/home' component={HomePage} />
        <Route path='/challenges' component={ChallengesRouting} />
        <Route path='/communities' component={CommunitiesRouting} />
        <Route path='/students' component={StudentsRouting} />
      </>
      )
    }
  }


export default App
