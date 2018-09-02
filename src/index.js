import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { applyMiddleware, createStore } from 'redux';
import Routes from './routes';
import combineReducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import withSettings from './api/connection';
import en from './translations/en.json';

axios.defaults = withSettings(axios.defaults);

ReactDOM.render(
  <IntlProvider locale="en" messages={en}>
    <Provider store={createStore(combineReducers, applyMiddleware(thunk, logger))}>
      <Routes />
    </Provider>
  </IntlProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
