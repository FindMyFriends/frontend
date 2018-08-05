// @flow
import axios from 'axios';
import httpBuildQuery from 'http-build-query';
import {
  requestedDemand,
  receivedAll,
  receivedSingle,
  DEMAND,
} from './actions';
import { track } from './spot/endpoints';
import { options as schemaOptions, schema as schemaStructure } from '../schema/endpoints';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from '../ui/actions';
import type { PaginationType } from '../dataset/PaginationType';
import extractedLocationId from '../api/extractedLocationId';

export const options = () => (dispatch: (mixed) => Object) => {
  dispatch(schemaOptions('/demands', DEMAND));
};

export const schema = () => (dispatch: (mixed) => Object) => {
  dispatch(schemaStructure('/schema/demand/get.json', DEMAND));
};

export const getScopeOptions = (state: Object): ?Object => (
  state.schema[DEMAND] && state.schema[DEMAND].options
    ? state.schema[DEMAND].options.options
    : null
);

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
  axios.get(`/demands/${id}?${query}`)
    .then(response => dispatch(receivedSingle(id, response.data, response.headers.etag)));
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
  const { spot, ...demand } = input;
  axios.post('/demands', demand)
    .then((response) => {
      dispatch(receivedSuccessMessage('Demand has been added'));
      return extractedLocationId(response.headers.spot);
    })
    .then((id) => {
      track(id, spot);
      return id;
    })
    .then(id => next(id))
    .catch(error => dispatch(receivedApiError(error)));
};

export const reconsider = (
  id: string,
  input: Object,
  next: (string) => void,
) => (dispatch: (mixed) => Object) => {
  const { location, ...demand } = input;
  axios.put(`/demands/${id}`, demand)
    .then(dispatch(receivedSuccessMessage('Demand has been reconsidered')))
    // .then(track(id, spot))
    .then(() => next(id))
    .catch(error => dispatch(receivedApiError(error)));
};
