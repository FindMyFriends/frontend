// @flow
import axios from 'axios';
import { receivedApiError } from '../ui/actions';

export const create = (
  email: string,
  password: string,
  next: (Object) => Promise<any>,
) => (dispatch: (mixed) => Object) => (
  axios.post('/tokens', { email, password })
    .then(response => response.data)
    .then(next)
    .catch(error => dispatch(receivedApiError(error)))
);

export const invalidate = (next: (void) => Promise<any>) => (
  axios.delete('/tokens').finally(next)
);
