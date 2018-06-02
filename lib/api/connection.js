'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withSettings;

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _cookie = require('../access/cookie');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamicHeaders = function dynamicHeaders() {
  var _getCookie = (0, _cookie.getCookie)(),
      token = _getCookie.token;

  if (token) {
    return {
      Authorization: 'Bearer ' + (0, _cookie.getCookie)().token
    };
  }
  return {};
};

function withSettings(inherited) {
  return (0, _merge2.default)(inherited, {
    baseURL: 'https://fmf.localhost',
    data: null,
    headers: {
      common: _extends({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, dynamicHeaders())
    }
  });
};