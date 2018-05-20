import { serialize, parse } from 'cookie';

const name = 'sessid';

export type Cookie = {|
  +token: string,
|};

export const setCookie = (cookie: Cookie) => {
  const options = {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  };
  window.document.cookie = serialize(name, cookie.token, options);
};

export const deleteCookie = () => {
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

export const loggedIn = () => getCookie().token !== null;
