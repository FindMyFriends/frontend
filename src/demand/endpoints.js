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
import { forget, track } from './spot/endpoints';
import { options as schemaOptions, schema as schemaStructure } from '../schema/endpoints';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from '../ui/actions';
import type { PaginationType } from '../dataset/PaginationType';
import * as response from '../api/response';
import { fetchedAll, fetchedSingle } from './selects';
import {
  forgottenSpots,
  move,
  movedSpots,
  newSpots,
} from '../spot/endpoints';
import { getSpotsByDemand } from '../spot/selects';
import { invalidatedByDemand } from '../spot/actions';

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
        fields: ['general', 'id', 'created_at', 'note'].join(','),
        sort: [...sorts, '+id'].join(','),
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

export const add = (input: Object, next: Promise<any> => void) => (dispatch: (mixed) => Object) => {
  const { spots, ...demand } = input;
  axios.post('/demands', demand)
    .then((response) => {
      dispatch(receivedSuccessMessage('Demand has been added'));
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

const omittedDemand = (demand: Object) => omit(demand, ['id', 'created_at', 'seeker_id']);

export const reconsider = (
  id: string,
  input: Object,
  etag: string,
  next: (string) => void,
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  const { spots, ...demand } = input;
  axios.put(`/demands/${id}`, omittedDemand(demand), { headers: { 'If-Match': etag } })
    .then(() => dispatch(invalidatedSingle(id)))
    .then(() => {
      const storedSpots = getSpotsByDemand(getState(), id);
      Promise.resolve()
        .then(() => forget(id, forgottenSpots(spots, storedSpots).map(spot => spot.id)))
        .then(() => move(movedSpots(spots, storedSpots)))
        .then(() => track(id, newSpots(spots)))
        .then(() => dispatch(invalidatedByDemand(id)));
    })
    .then(dispatch(receivedSuccessMessage('Demand has been reconsidered')))
    .then(next)
    .catch(error => dispatch(receivedApiError(error)));
};
