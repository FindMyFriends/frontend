// @flow
import axios from 'axios';
import { fetchedEvolutionSpots } from '../../spot/selects';
import { receivedSpots, requestedSpots } from '../../spot/actions';
import { receivedApiError } from '../../ui/actions';

export const track = (
  id: string,
  spots: Array<Object>,
) => {
  Promise.all(spots.map(spot => (axios.post(`/evolutions/${id}/spots`, spot))));
};

export const history = (
  evolution: string,
  sorts: Array<string> = [],
  next: () => (void) = () => {},
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedEvolutionSpots(evolution, getState())) {
    next(); // TODO: not transparent enough
    return;
  }
  dispatch(requestedSpots());
  axios.get(
    `/evolutions/${evolution}/spots`,
    {
      params: {
        fields: ['assigned_at', 'coordinates', 'id', 'met_at', 'evolution_id'].join(','),
        sort: sorts.join(','),
      },
    },
  )
    .then(response => dispatch(receivedSpots(response.data)))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};
