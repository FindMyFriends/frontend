// @flow
import axios from 'axios';
import { requestedPlace, receivedPlace } from './actions';
import { fetchedPlaces } from './reducers';

export type Coordinates = {|
  +latitude: number,
  +longitude: number,
|};

const place = (
  id: string,
  coordinates: Coordinates,
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedPlaces(getState())) return;
  dispatch(requestedPlace(id));
  axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}`,
    {
      transformRequest: [(data, headers) => {
        delete headers.common.Authorization; // eslint-disable-line
        return data;
      }],
    },
  )
    .then(response => response.data.results[0].formatted_address)
    .then(address => dispatch(receivedPlace(id, address)))
    .catch(() => dispatch(receivedPlace(id, 'unknown', true)));
};

export const places = (spots: Array<Object>) => (dispatch: (mixed) => Object) => {
  Promise.all(spots.map(spot => dispatch(place(spot.id, spot.coordinates))));
};
