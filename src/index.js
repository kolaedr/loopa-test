import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import About from './pages/About';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/about' component={About} />
    </Switch>
  </Router>,
  document.getElementById('root')
);