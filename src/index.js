import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Routes from './Routes';
import createReducers from './createReducers';
import registerServiceWorker from './registerServiceWorker';
import { defaults } from './api/connection';

axios.defaults = defaults(axios.defaults);

ReactDOM.render(
  <Provider store={createStore(createReducers, applyMiddleware(thunk, logger))}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
