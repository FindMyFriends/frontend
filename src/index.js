import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Routes from './Routes';
import createReducers from './createReducers.js';
import registerServiceWorker from './registerServiceWorker';
import './css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={createStore(createReducers, applyMiddleware(logger))}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
