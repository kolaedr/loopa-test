import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById('root')
);