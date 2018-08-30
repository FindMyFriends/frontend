// @flow
import axios from 'axios';
import { receivedSuccess as receivedSuccessMessage, receivedApiError } from '../ui/actions';

export const activate = (
  code: string,
  next: (void) => void,
) => (dispatch: (mixed) => Object) => {
  axios.post('/activations', { code })
    .then(() => dispatch(receivedSuccessMessage('Account has been activated')))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)))
    .then(next);
};
