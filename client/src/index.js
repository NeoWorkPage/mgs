import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './views/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
