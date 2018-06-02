'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loggedIn = exports.getCookie = exports.deleteCookie = exports.setCookie = undefined;

var _cookie = require('cookie');

var name = 'sessid';
var setCookie = exports.setCookie = function setCookie(cookie) {
  var options = {
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  };
  window.document.cookie = (0, _cookie.serialize)(name, cookie.token, options);
};

var deleteCookie = exports.deleteCookie = function deleteCookie() {
  var options = {
    maxAge: -1,
    path: '/'
  };
  window.document.cookie = (0, _cookie.serialize)(name, '', options);
};

var getCookie = exports.getCookie = function getCookie() {
  var cookie = (0, _cookie.parse)(window.document.cookie);
  return {
    token: !cookie || !cookie[name] ? null : cookie[name]
  };
};

var loggedIn = exports.loggedIn = function loggedIn() {
  return getCookie().token !== null;
};