// @flow
import axios from 'axios';
import {
  receivedAllByDemand,
  requestedAllByDemand,
  receivedInfoByDemand,
  requestedInfoByDemand,
} from './actions';
import { receivedSuccess, receivedApiError } from '../ui/actions';
import type { PaginationType } from '../dataset/PaginationType';
import { fetchedDemandSoulmates, fetchedDemandInfo } from './reducers';

export const all = (
  demand: string,
  sorts: Array<string>,
  pagination: PaginationType,
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedDemandSoulmates(demand, getState())) return;
  dispatch(requestedAllByDemand(demand));
  axios.get(
    `/demands/${demand}/soulmates`,
    {
      params: {
        page: pagination.page,
        per_page: pagination.perPage,
        fields: ['id', 'evolution_id', 'is_correct', 'is_new', 'position', 'related_at'].join(','),
        sort: sorts.join(','),
      },
    },
  )
    .then(response => dispatch(receivedAllByDemand(demand, response.data, response.headers)));
};

export const info = (demand: string) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedDemandInfo(demand, getState())) return;
  dispatch(requestedInfoByDemand(demand));
  axios.head(`/demands/${demand}/soulmates`)
    .then(response => dispatch(receivedInfoByDemand(demand, response.headers)));
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
