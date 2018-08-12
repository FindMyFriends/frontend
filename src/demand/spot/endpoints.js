// @flow
import axios from 'axios';
import httpBuildQuery from 'http-build-query';
import { requestedSpots, receivedSpots } from '../../spot/actions';
import { receivedApiError } from '../../ui/actions';
import { fetchedDemandSpots } from '../../spot/reducers';

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
  next: () => (void) = () => {},
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedDemandSpots(demand, getState())) {
    next(); // TODO: not transparent enough
    return;
  }
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
