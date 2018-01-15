import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Home } from './Home';
import { Nav } from './Nav';

ReactDOM.render(
  <Router>
    <div>
      <Nav/>
      <Switch>
        <Route component={Home} exact path='/'/>
        <Redirect to='/'/>
      </Switch>
    </div>
  </Router>,
  document.getElementById('app')
);
