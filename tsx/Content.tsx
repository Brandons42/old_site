import * as React from 'react';

const img = require('../img/img.jpeg');

export class Content extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <img src={img}/>
      </div>
    );
  }
}
