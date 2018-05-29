// @flow
import axios from 'axios';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from './../ui/actions';
import { setCookie, deleteCookie } from '../access/cookie';

export const enter = (
  email: string,
  password: string,
  next: (void) => void,
) => (dispatch: (mixed) => Object) => {
  return axios.post('/v1/tokens', { email, password })
    .then(response => setCookie(response.data))
    .then(() => dispatch(receivedSuccessMessage('You have been successfully signed in')))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};

export const exit = (history: Object, next: (void) => void) => (dispatch: (mixed) => Object) => {
  return axios.delete('/v1/tokens')
    .then(() => deleteCookie())
    .then(() => dispatch(receivedSuccessMessage('You have been successfully signed out')))
    .then(next);
};
