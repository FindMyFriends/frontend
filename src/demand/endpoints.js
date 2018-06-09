// @flow
import axios from 'axios';
import httpBuildQuery from 'http-build-query';
import {
  requestedDemand,
  receivedAll,
  receivedSingle,
  DEMAND,
} from './actions';
import { options } from '../schema/endpoints';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from '../ui/actions';
import type { PaginationType } from '../dataset/PaginationType';

export const all = (
  sorts: Array<string>,
  pagination: PaginationType,
) => (dispatch: (mixed) => Object) => {
  dispatch(requestedDemand());
  const query = httpBuildQuery({
    page: pagination.page,
    per_page: pagination.perPage,
    fields: ['general', 'soulmates', 'id', 'created_at', 'note'].join(','),
    sort: sorts.join(','),
  });
  axios.get(`/demands?${query}`)
    .then(response => dispatch(receivedAll(response.data, response.headers)));
};

export const single = (id: string, fields: Array<string> = []) => (dispatch: (mixed) => Object) => {
  dispatch(requestedDemand());
  const query = httpBuildQuery({
    fields: fields.join(','),
  });
  Promise.all([
    axios.get(`/demands/${id}?${query}`)
      .then(response => dispatch(receivedSingle(id, response.data, response.headers.etag))),
    dispatch(options('/demands', DEMAND)),
  ]);
};

export const retract = (id: string, next: () => void) => (dispatch: (mixed) => Object) => {
  axios.delete(`/demands/${id}`)
    .then(() => dispatch(receivedSuccessMessage('Demand has been retracted')))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};

export const saveNote = (
  id: string,
  note: string,
  next: Promise<any>,
) => (dispatch: (mixed) => Object) => {
  axios.patch(`/demands/${id}`, { note })
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};
