///<reference types="webpack-env" />
import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HotApp as App } from './HotApp';


function render() {
  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('app')
  );
}

render();

module.hot.accept('./HotApp', function() {
  render();
});
