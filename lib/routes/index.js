'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _Layout = require('./../pages/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _Default = require('./../pages/Default');

var _Default2 = _interopRequireDefault(_Default);

var _All = require('./../pages/demands/All');

var _All2 = _interopRequireDefault(_All);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = function Routes() {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_Layout2.default, { exact: true, path: '/', component: _Default2.default }),
      _react2.default.createElement(_Layout2.default, { path: '/demands', component: _All2.default })
    )
  );
};
exports.default = Routes;