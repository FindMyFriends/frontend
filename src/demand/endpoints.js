// @flow
import axios from 'axios';
import { omit } from 'lodash';
import {
  requestedSingle,
  requestedAll,
  receivedAll,
  receivedSingle,
  invalidatedSingle,
  DEMAND,
} from './actions';
import { track } from './spot/endpoints';
import { options as schemaOptions, schema as schemaStructure } from '../schema/endpoints';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from '../ui/actions';
import type { PaginationType } from '../dataset/PaginationType';
import extractedLocationId from '../api/extractedLocationId';
import { fetchedAll, fetchedSingle } from './reducers';

export const options = () => (dispatch: (mixed) => Object) => {
  dispatch(schemaOptions('/demands', DEMAND));
};

export const schema = () => (dispatch: (mixed) => Object) => {
  dispatch(schemaStructure('/schema/demand/get.json', DEMAND));
};

export const all = (
  sorts: Array<string>,
  pagination: PaginationType,
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedAll(getState())) return;
  dispatch(requestedAll());
  axios.get(
    '/demands',
    {
      params: {
        page: pagination.page,
        per_page: pagination.perPage,
        fields: ['general', 'soulmates', 'id', 'created_at', 'note'].join(','),
        sort: sorts.join(','),
      },
    },
  )
    .then(response => dispatch(receivedAll(response.data, response.headers)));
};

export const single = (
  id: string,
  fields: Array<string> = [],
  next: () => (void) = () => {},
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedSingle(id, getState())) {
    next(); // TODO: not transparent
    return;
  }
  dispatch(requestedSingle(id));
  axios.get(
    `/demands/${id}`,
    {
      params: {
        fields: fields.join(','),
      },
    },
  )
    .then(response => dispatch(receivedSingle(id, response.data, response.headers.etag)))
    .then(next);
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

export const add = (input: Object, next: (string) => void) => (dispatch: (mixed) => Object) => {
  const { spots, ...demand } = input;
  axios.post('/demands', demand)
    .then((response) => {
      dispatch(receivedSuccessMessage('Demand has been added'));
      return extractedLocationId(response.headers.location);
    })
    .then((id) => {
      track(id, spots);
      return id;
    })
    .then(id => next(id))
    .catch(error => dispatch(receivedApiError(error)));
};

export const reconsider = (
  id: string,
  demand: Object,
  etag: string,
  next: (string) => void,
) => (dispatch: (mixed) => Object) => {
  axios.put(`/demands/${id}`, omit(demand, ['id', 'created_at', 'seeker_id']), { headers: { 'If-Match': etag } })
    .then(dispatch(receivedSuccessMessage('Demand has been reconsidered')))
    .then(() => dispatch(invalidatedSingle(id)))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};
