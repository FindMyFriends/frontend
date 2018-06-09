'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reducers = require('./../demand/reducers');

var _reducers2 = require('./../ui/reducers');

exports.default = (0, _redux.combineReducers)({
  demand: _reducers.demand,
  message: _reducers2.message
});