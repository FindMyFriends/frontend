// @flow
import axios from 'axios';
import moment from 'moment';
import { omit } from 'lodash';
import { track } from './spot/endpoints';
import {
  receivedAll, requestedSingle, requestedAll, receivedSingle, EVOLUTION,
} from './actions';
import { options as schemaOptions, schema as schemaStructure } from '../schema/endpoints';
import type { PaginationType } from '../dataset/PaginationType';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from '../ui/actions';
import * as response from '../api/response';
import { fetchedAll, fetchedSingle, getById } from './selects';

export const options = (next: (?Object) => (void) = () => {}) => (dispatch: (mixed) => Object) => {
  dispatch(schemaOptions('/evolutions', EVOLUTION, next));
};

export const schema = () => (dispatch: (mixed) => Object) => {
  dispatch(schemaStructure('/schema/evolution/get.json', EVOLUTION));
};

export const all = (
  sorts: Array<string>,
  pagination: PaginationType,
  next: () => (void) = () => {},
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedAll(getState())) {
    next();
    return;
  }
  dispatch(requestedAll());
  dispatch(options((allOptions: ?Object) => (
    axios.get(
      '/evolutions',
      {
        params: {
          page: pagination.page,
          per_page: pagination.perPage,
          fields: [...Object.keys(allOptions ? allOptions.columns : {}), 'id', 'evolved_at'].join(','),
          sort: [...sorts, '+id'].join(','),
        },
      },
    )
      .then(response => dispatch(receivedAll(response.data, response.headers)))
      .then(next)
  )));
};

const omittedChange = (change: Object) => omit(change, ['id', 'seeker_id', 'general.age']);

export const single = (
  id: string,
  fields: Array<string> = [],
  next: (Object) => (void) = () => {},
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedSingle(id, getState())) {
    next(getById(id, getState()));
    return;
  }
  dispatch(requestedSingle(id));
  axios.get(
    `/evolutions/${id}`,
    {
      params: {
        fields: fields.join(','),
      },
    },
  )
    .then((response) => {
      dispatch(receivedSingle(id, response.data, response.headers.etag));
      return response.data;
    })
    .then(evolution => omittedChange(evolution))
    .then(evolution => next(evolution));
};

export const extend = (
  progress: Object,
  next: (string) => void,
) => (dispatch: (mixed) => Object) => {
  const { spots, ...change } = progress;
  axios.post(
    '/evolutions',
    {
      ...omittedChange(change),
      evolved_at: moment().toISOString(true),
    },
  )
    .then((response) => {
      dispatch(receivedSuccessMessage('Evolution has been extended'));
      return response.headers;
    })
    .then(headers => response.extractedLocationId(headers.location))
    .then((id) => {
      track(id, spots);
      return id;
    })
    .then(id => next(id))
    .catch(error => dispatch(receivedApiError(error)));
};

export const revert = (id: string, next: () => void) => (dispatch: (mixed) => Object) => {
  axios.delete(`/evolutions/${id}`)
    .then(() => dispatch(receivedSuccessMessage('Evolution change has been reverted')))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};
