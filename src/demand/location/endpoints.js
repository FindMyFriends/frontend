// @flow
import axios from 'axios';
import { requestedLocations, receivedLocations } from '../actions';
import { receivedApiError } from '../../ui/actions';

export const track = (
  id: string,
  location: Object,
) => {
  axios.post(
    `/demands/${id}/locations`,
    location,
  );
};

export const history = (demand: string) => (dispatch: (mixed) => Object) => {
  dispatch(requestedLocations());
  axios.get(`/demands/${demand}/locations`)
    .then(response => dispatch(receivedLocations(response.data)))
    .catch(error => dispatch(receivedApiError(error)));
};
