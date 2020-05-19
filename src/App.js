import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import Nav from './_Common/Nav'
import ChallengesRouting from './Challenges/ChallengesRouting'
import CommunitiesRouting from './Communities/CommunitiesRouting'
import StudentsRouting from './Students/StudentsRouting/StudentsRouting'
import AboutPage from './AboutPage/AboutPage'

class App extends Component{

  render(){
    return (
      <>
        <Nav />
        <Route exact path='/' render={() => <header><h1>Green Dragons App</h1></header>} />
        <Route path='/about' component={AboutPage} />
        <Route path='/challenges' component={ChallengesRouting} />
        <Route path='/communities' component={CommunitiesRouting} />
        <Route path='/students' component={StudentsRouting} />
      </>
      )
    }
  }


export default App
