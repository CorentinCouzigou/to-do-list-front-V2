import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './component/App/App';
import store from './store';

import './reset.css';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);