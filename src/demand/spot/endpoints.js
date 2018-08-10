// @flow
import axios from 'axios';
import httpBuildQuery from 'http-build-query';
import { requestedSpots, receivedSpots } from '../actions';
import { receivedApiError } from '../../ui/actions';

export const track = (
  id: string,
  spots: Array<Object>,
) => {
  Promise.all(spots.map(spot => (
    axios.post(
      `/demands/${id}/spots`,
      spot,
    )
  )));
};

export const history = (
  demand: string,
  sorts: Array<string> = [],
  next: (Object) => (void) = () => {},
) => (dispatch: (mixed) => Object) => {
  dispatch(requestedSpots());
  const query = httpBuildQuery({
    sort: sorts.join(','),
    fields: ['assigned_at', 'coordinates', 'id', 'met_at'].join(','),
  });
  axios.get(`/demands/${demand}/spots?${query}`)
    .then(response => dispatch(receivedSpots(response.data)))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};
