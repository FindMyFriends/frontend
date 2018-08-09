// @flow
import axios from 'axios';
import httpBuildQuery from 'http-build-query';
import {
  receivedAllByDemand,
  requestedAllByDemand,
  receivedInfo,
  requestedInfo,
} from './actions';
import { receivedSuccess, receivedApiError } from '../ui/actions';
import type { PaginationType } from '../dataset/PaginationType';
import { fetchedAll } from './reducers';

export const all = (
  demand: string,
  sorts: Array<string>,
  pagination: PaginationType,
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedAll(getState())) return;
  dispatch(requestedAllByDemand());
  const query = httpBuildQuery({
    page: pagination.page,
    per_page: pagination.perPage,
    fields: ['id', 'evolution_id', 'is_correct', 'is_new', 'position', 'related_at'].join(','),
    sort: sorts.join(','),
  });
  axios.get(`/demands/${demand}/soulmates?${query}`)
    .then(response => dispatch(receivedAllByDemand(response.data, response.headers)));
};

export const info = (demand: string) => (dispatch: (mixed) => Object) => {
  dispatch(requestedInfo());
  axios.head(`/demands/${demand}/soulmates`)
    .then(response => dispatch(receivedInfo(response.headers)));
};

export const clarify = (
  soulmate: string,
  clarification: Object,
  next: Promise<any>,
) => (dispatch: (mixed) => Object) => {
  axios.patch(`/soulmates/${soulmate}`, clarification)
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};

export const markAs = (
  soulmate: string,
  as: boolean,
  next: () => void,
) => (dispatch: (mixed) => Object) => {
  dispatch(clarify(
    soulmate,
    { is_correct: as },
    Promise.resolve()
      .then(() => dispatch(receivedSuccess(`Soulmate was marked as ${as ? 'correct' : 'incorrect'}`)))
      .then(next),
  ));
};
