import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('App'));

if (module.hot) {
  module.hot.accept();
}
