import React from 'react';
import {Route} from 'react-router-dom'
import Nav from './_Common/Nav'
import ChallengesRouting from './ChallengeTypes/ChallengeTypesRouting'
import CommunitiesRouting from './Communities/CommunitiesRouting'
import UsersRouting from './Users/UsersRouting'

// import ChallengeTypesListContainer from './ListContainers/ChallengeTypesListContainer'
// import UsersListContainer from './ListContainers/UsersListContainer'
// import CommunitiesListContainer from './ListContainers/CommunitiesListContainer'

const App = () => {
  return (
    <>
      <Nav/>
      <Route path='/challenges' component={ChallengesRouting} />
      <Route path='/communities' component={CommunitiesRouting} />
      <Route path='/users' component={UsersRouting} />
    </>
  );
}

export default App;
