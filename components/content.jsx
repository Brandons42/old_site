import React from 'react';

import img from '../img/img.jpeg';
//import '../styles/main.sass';

export default class Content extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <img src={img}/>
      </div>
    );
  }
}
