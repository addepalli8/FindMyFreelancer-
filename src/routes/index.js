import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home';

const routes = (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home" component={Home} />
    </Switch>
  </Router>
);

export default routes;
