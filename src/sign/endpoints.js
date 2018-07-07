// @flow
import axios from 'axios';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from './../ui/actions';
import { setCookie, deleteCookie } from '../access/cookie';

export const enter = (
  email: string,
  password: string,
  next: (void) => void,
) => (dispatch: (mixed) => Object) => {
  axios.post('/tokens', { email, password })
    .then(response => setCookie(response.data))
    .then(() => dispatch(receivedSuccessMessage('You have been successfully signed in')))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};

export const exit = (next: (void) => void) => (dispatch: (mixed) => Object) => {
  axios.delete('/tokens')
    .finally(deleteCookie)
    .finally(() => dispatch(receivedSuccessMessage('You have been successfully signed out')))
    .finally(next);
};
