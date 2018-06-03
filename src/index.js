import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Routes from './routes';
import combineReducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import withSettings from './api/connection';

axios.defaults = withSettings(axios.defaults);

ReactDOM.render(
  <Provider store={createStore(combineReducers, applyMiddleware(thunk))}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
