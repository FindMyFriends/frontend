import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import './css/bootstrap.min.css';
import App from './App';
import All from './pages/demands/All';
import createReducers from './createReducers.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createStore(createReducers, applyMiddleware(logger))}>
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route exact path='/demands/all' component={All}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
