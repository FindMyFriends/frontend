// @flow
import axios from 'axios';
import { receivedApiError } from '../ui/actions';
import type { RegistrationData } from './types';

export const join = (
  data: RegistrationData,
  next: (Object) => Promise<any>,
) => (dispatch: (mixed) => Object) => (
  axios.post('/seekers', data)
    .then(response => response.data)
    .then(next)
    .catch(error => dispatch(receivedApiError(error)))
);
