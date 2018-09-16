import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import Router from './router';
import combineReducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import withSettings from './api/connection';
import en from './translations/en.json';
import * as session from './access/session';
import { refresh } from './token/endpoints';

axios.defaults = withSettings(axios.defaults);

const history = createBrowserHistory();
history.listen((location) => {
  if (session.exists() && session.expired()) {
    refresh(
      session.getValue(),
      data => session.start({ value: data.token, expiration: data.expiration }),
      () => {
        session.destroy();
        history.push('sign/in', { state: { from: location } });
      },
    );
  }
});

ReactDOM.render(
  <IntlProvider locale="en" messages={en}>
    <Provider store={createStore(combineReducers, applyMiddleware(thunk, logger))}>
      <Router history={history} />
    </Provider>
  </IntlProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
