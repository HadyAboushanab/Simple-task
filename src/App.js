import React from 'react';
import './styles.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RepositoryList from './components/RepositoryList/repositoryList';
import RepositoryDetails from './components/RepositoryDetails/repositoryDetails';
import OwnerDetails from './components/OwnerDetails/ownerDetails'; 

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={RepositoryList} />
          <Route path="/repository/:id" component={RepositoryDetails} />
          <Route path="/owner/:login" component={OwnerDetails} /> 
        </Switch>
      </div>
    </Router>
  );
};

export default App;
