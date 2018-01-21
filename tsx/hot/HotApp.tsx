import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import * as React from 'react';

import { Home } from '../Home';
import { Nav } from '../Nav';

export class HotApp extends React.Component {
  render() {
    return(
      <Router>
        <div>
          <Nav/>
          <Switch>
            <Route component={Home} exact path='/'/>
            <Redirect to='/'/>
          </Switch>
        </div>
      </Router>
    );
  }
}
