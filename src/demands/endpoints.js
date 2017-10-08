import { authorized } from './../http/requests';
import baseUrl from './../http/baseUrl';
import { fetchAllDemands } from './actions';

export const all = () => {
  return dispatch => {
    fetch(baseUrl('/v1/demands'), authorized())
    .then(response => response.json())
    .then(demands => dispatch(fetchAllDemands(demands)));
  };
};
