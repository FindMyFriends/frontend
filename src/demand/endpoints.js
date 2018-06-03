// @flow
import axios from 'axios';
import omit from 'lodash/omit';
import httpBuildQuery from 'http-build-query';
import * as R from 'ramda';
import {
  addedDemand,
  receivedAll,
  receivedSingle,
  receivedReconsideration,
  receivedOptions,
  receivedSchema,
} from './actions';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from './../ui/actions';
import { loadOptions, loadSchema } from './../api/schema';
import type { PaginationType } from './../dataset/PaginationType';

export const options = () => (dispatch: (mixed) => Object) => {
  loadOptions('/v1/demands')
    .then(options => dispatch(receivedOptions(options)));
};

export const schema = () => (dispatch: (mixed) => Object) => {
  loadSchema('/schema/v1/demand/get.json')
    .then(schema => dispatch(receivedSchema(schema)));
};

export const all = (
  sorts: Array<string>,
  pagination: PaginationType,
) => (dispatch: (mixed) => Object) => {
  const query = httpBuildQuery({
    page: pagination.page,
    per_page: pagination.perPage,
    fields: ['general', 'soulmates', 'id', 'created_at', 'note'].join(','),
    sort: sorts.join(','),
  });
  axios.get(`/v1/demands?${query}`)
    .then(response => dispatch(receivedAll(response.data, response.headers)));
};

export const single = (id: string, fields: Array<string> = []) => (dispatch: (mixed) => Object) => {
  const query = httpBuildQuery({
    fields: fields.join(','),
  });
  axios.get(`/v1/demands/${id}?${query}`)
    .then(response => dispatch(receivedSingle(id, response.data, response.headers.etag)));
};

export const add = (demand: Object, next: (string) => void) => (dispatch: (mixed) => Object) => {
  axios.post('/v1/demands', demand)
    .then((response) => {
      const newDemand = dispatch(addedDemand(demand, response.headers.location));
      dispatch(receivedSuccessMessage('Demand has been added'));
      return newDemand;
    })
    .then(demand => next(demand.id))
    .catch(error => dispatch(receivedApiError(error)));
};

export const reconsider = (
  id: string,
  demand: Object,
  etag: string,
  next: (string) => void,
) => (dispatch: (mixed) => Object) => {
  const curry = (name: string) => (demand: Object): Object => {
    return omit(demand, name);
  };
  const reconsidered = R.compose(
    curry('soulmates'),
    curry('seeker_id'),
    curry('created_at'),
    curry('id'),
    () => demand,
  )();
  axios.put(`/v1/demands/${id}`, reconsidered, { headers: { 'if-match': etag } })
    .then(() => dispatch(receivedReconsideration(id)))
    .then(() => dispatch(receivedSuccessMessage('Demand has been reconsidered')))
    .then(() => next(id))
    .catch(error => dispatch(receivedApiError(error)));
};

export const retract = (id: string, next: () => void) => (dispatch: (mixed) => Object) => {
  axios.delete(`/v1/demands/${id}`)
    .then(() => dispatch(receivedSuccessMessage('Demand has been retracted')))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};

export const saveNote = (
  id: string,
  note: string,
  next: Promise<any>,
) => (dispatch: (mixed) => Object) => {
  axios.patch(`/v1/demands/${id}`, { note })
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};
