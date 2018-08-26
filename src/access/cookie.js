// @flow
import { serialize, parse } from 'cookie';

const name = 'sessid';
const THRESHOLD = 10;

export type Cookie = {|
  +token: ?string,
|};

type Authorization = {|
  +token: string,
  +expiration: number,
|};

export const setCookie = (authorization: Authorization): void => {
  const options = {
    maxAge: authorization.expiration - THRESHOLD,
    path: '/',
  };
  window.document.cookie = serialize(name, authorization.token, options);
};

export const deleteCookie = (): void => {
  const options = {
    maxAge: -1,
    path: '/',
  };
  window.document.cookie = serialize(name, '', options);
};

export const getCookie = (): Cookie => {
  const cookie = parse(window.document.cookie);
  return {
    token: !cookie || !cookie[name] ? null : cookie[name],
  };
};

export const loggedIn = (): boolean => getCookie().token !== null;
