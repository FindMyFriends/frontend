import { authorized } from './../http/requests';
import baseUrl from './../http/baseUrl';

export const ALL = 'ALL';

export const all = () => {
  return dispatch => {
    fetch(baseUrl('/v1/demands'), authorized())
    .then(response => response.json())
    .then(demands => dispatch({ type: ALL, demands }));
  };
};
