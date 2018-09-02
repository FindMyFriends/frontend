// @flow
import axios from 'axios';
import { requestedSpots, receivedSpots } from '../../spot/actions';
import { receivedApiError } from '../../ui/actions';
import { fetchedDemandSpots } from '../../spot/selects';

export const track = (
  id: string,
  spots: Array<Object>,
) => {
  Promise.all(spots.map(spot => (axios.post(`/demands/${id}/spots`, spot))));
};

export const forget = (
  id: string,
  spotIds: Array<string>,
) => {
  Promise.all(spotIds.map(spotId => axios.delete(`/demands/${id}/spots/${spotId}`)));
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
  axios.get(
    `/demands/${demand}/spots`,
    {
      params: {
        fields: ['assigned_at', 'coordinates', 'id', 'met_at', 'demand_id'].join(','),
        sort: sorts.join(','),
      },
    },
  )
    .then(response => dispatch(receivedSpots(response.data)))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};
