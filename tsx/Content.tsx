import * as React from 'react';

import '../sass-modules/content.sass';

const img = require('../img/img.jpeg');

export class Content extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <img className='img' src={img}/>
      </div>
    );
  }
}
