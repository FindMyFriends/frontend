import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Routes from './Routes';
import createReducers from './createReducers';
import registerServiceWorker from './registerServiceWorker';
import './css/bootstrap.min.css';

axios.defaults.baseURL = 'http://localhost';
axios.defaults.data = null;
axios.defaults.headers.common['Content-Type'] = 'application/json';

ReactDOM.render(
  <Provider store={createStore(createReducers, applyMiddleware(logger))}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
