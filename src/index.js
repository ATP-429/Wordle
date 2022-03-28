import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

ReactDOM.render(
  <React.StrictMode>
    <App length="5" guesses="6"/>
  </React.StrictMode>,
  document.getElementById('root')
);
