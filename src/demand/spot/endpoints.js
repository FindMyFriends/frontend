// @flow
import axios from 'axios';
import { requestedsSpots, receivedSpots } from '../actions';
import { receivedApiError } from '../../ui/actions';

export const track = (
  id: string,
  spot: Object,
) => {
  axios.post(
    `/demands/${id}/spots`,
    spot,
  );
};

export const history = (
  demand: string,
  next: (Object) => (void) = () => {},
) => (dispatch: (mixed) => Object) => {
  dispatch(requestedsSpots());
  axios.get(`/demands/${demand}/spots`)
    .then(response => dispatch(receivedSpots(response.data)))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};
