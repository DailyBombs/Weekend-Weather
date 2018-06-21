import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './static/style/normalize.css';
import './static/style/app.css';

ReactDOM.render(
    <App />
  , document.getElementById('root'),
);
registerServiceWorker();
