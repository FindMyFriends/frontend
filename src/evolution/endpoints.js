// @flow
import axios from 'axios';
import moment from 'moment';
import { omit } from 'lodash';
import httpBuildQuery from 'http-build-query';
import { receivedAll, requestedEvolution, receivedSingle, EVOLUTION } from './actions';
import { options as schemaOptions, schema as schemaStructure } from '../schema/endpoints';
import type { PaginationType } from '../dataset/PaginationType';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from '../ui/actions';
import extractedLocationId from '../api/extractedLocationId';

export const options = () => (dispatch: (mixed) => Object) => {
  dispatch(schemaOptions('/evolutions', EVOLUTION));
};

export const schema = () => (dispatch: (mixed) => Object) => {
  dispatch(schemaStructure('/schema/evolution/get.json', EVOLUTION));
};

export const all = (
  sorts: Array<string>,
  pagination: PaginationType,
) => (dispatch: (mixed) => Object) => {
  dispatch(requestedEvolution());
  const query = httpBuildQuery({
    page: pagination.page,
    per_page: pagination.perPage,
    fields: ['id', 'evolved_at'].join(','),
    sort: sorts.join(','),
  });
  axios.get(`/evolutions?${query}`)
    .then(response => dispatch(receivedAll(response.data, response.headers)));
};

export const single = (
  id: string,
  fields: Array<string> = [],
  next: (Object) => (void) = () => null,
) => (dispatch: (mixed) => Object) => {
  dispatch(requestedEvolution());
  const query = httpBuildQuery({
    fields: fields.join(','),
  });
  axios.get(`/evolutions/${id}?${query}`)
    .then((response) => {
      dispatch(receivedSingle(id, response.data, response.headers.etag));
      return response.data;
    })
    .then(evolution => omit(evolution, ['id', 'seeker_id', 'general.age']))
    .then(evolution => next(evolution));
};

export const extend = (
  progress: Object,
  next: (string) => void,
) => (dispatch: (mixed) => Object) => {
  axios.post(
    '/evolutions',
    {
      ...progress,
      evolved_at: moment().toISOString(true),
    },
  )
    .then((response) => {
      dispatch(receivedSuccessMessage('Evolution has been extended'));
      return extractedLocationId(response.headers.location);
    })
    .then(id => next(id))
    .catch(error => dispatch(receivedApiError(error)));
};
