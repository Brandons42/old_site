import { NavLink } from 'react-router-dom';
import * as React from 'react';

import 'sass/nav';

export class Nav extends React.Component {
  render() {
    return (
      <nav className='nav'>
        <NavLink className='logo' to='/'>B</NavLink>
        <div className='links'>
          <NavLink className='link' to=''>Abilities</NavLink>
          <NavLink className='link' to=''>Accomplishments</NavLink>
          <NavLink className='link' to=''>Projects</NavLink>
        </div>
      </nav>
    );
  }
}
