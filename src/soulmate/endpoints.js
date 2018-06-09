// @flow
import axios from 'axios';
import httpBuildQuery from 'http-build-query';
import {
  receivedAllByDemand,
  requestedAllByDemand,
  receivedInfo,
  requestedInfo,
} from './actions';
import type { PaginationType } from '../dataset/PaginationType';

export const all = (
  demand: string,
  sorts: Array<String>,
  pagination: PaginationType,
) => (dispatch: (mixed) => Object) => {
  dispatch(requestedAllByDemand());
  const query = httpBuildQuery({
    page: pagination.page,
    per_page: pagination.perPage,
    fields: ['id', 'evolution_id', 'is_correct', 'is_new', 'position'].join(','),
    sort: sorts.join(','),
  });
  axios.get(`/v1/demands/${demand}/soulmates?${query}`)
    .then(response => dispatch(receivedAllByDemand(response.data, response.headers)));
};

export const info = (demand: string) => (dispatch: (mixed) => Object) => {
  dispatch(requestedInfo());
  axios.head(`/v1/demands/${demand}/soulmates`)
    .then(response => dispatch(receivedInfo(response.headers)));
};
