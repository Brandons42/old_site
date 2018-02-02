import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Abilities } from './Abilities';
import { Accomplishments } from './Accomplishments';
import { Home } from './Home';
import { Nav } from './Nav';
import { Projects } from './Projects';

ReactDOM.render(
  <Router>
    <div>
      <Nav/>
      <Switch>
        <Route component={Home} exact path='/'/>
        <Route component={Abilities} path='/abilities'/>
        <Route component={Accomplishments} path='/accomplishments'/>
        <Route component={Projects} path='/projecs'/>
        <Redirect to='/'/>
      </Switch>
    </div>
  </Router>,
  document.getElementById('app')
);
