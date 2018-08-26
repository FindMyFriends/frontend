// @flow
import { create, invalidate } from '../token/endpoints';
import { deleteCookie, setCookie } from '../access/cookie';
import { receivedSuccess as receivedSuccessMessage } from '../ui/actions';
import type { Credentials } from './types';

export const enter = (
  credentials: Credentials,
  next: (void) => void,
) => (dispatch: (mixed) => Object) => {
  dispatch(create(
    credentials.email,
    credentials.password,
    data => Promise.resolve()
      .then(() => setCookie(data))
      .then(() => dispatch(receivedSuccessMessage('You have been successfully signed in')))
      .then(next),
  ));
};

export const exit = (next: (void) => void) => (dispatch: (mixed) => Object) => {
  invalidate(() => Promise.resolve()
    .then(deleteCookie)
    .then(() => dispatch(receivedSuccessMessage('You have been successfully signed out')))
    .then(next));
};
