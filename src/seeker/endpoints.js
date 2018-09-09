// @flow
import axios from 'axios';
import { receivedApiError } from '../ui/actions';
import type { RegistrationData } from '../sign/types';
import { options as schemaOptions, schema as schemaStructure } from '../schema/endpoints';

export const SEEKER = 'SEEKER';
export const schema = () => (dispatch: (mixed) => Object) => dispatch(schemaStructure('/schema/seeker/get.json', SEEKER));
export const options = () => (dispatch: (mixed) => Object) => dispatch(schemaOptions('/seekers', SEEKER));

export const join = (
  data: RegistrationData,
  next: (Object) => Promise<any>,
) => (dispatch: (mixed) => Object) => (
  axios.post('/seekers', data)
    .then(response => response.data)
    .then(next)
    .catch(error => dispatch(receivedApiError(error)))
);
