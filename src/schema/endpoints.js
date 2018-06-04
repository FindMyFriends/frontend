// @flow
import {
  receivedOptions,
  requestedOptions,
  receivedSchema,
  requestedSchema,
} from './actions';
import { loadOptions, loadSchema } from './../api/schema';

export const options = (uri: string) => (dispatch: (mixed) => Object): Promise<any> => {
  dispatch(requestedOptions());
  return loadOptions(uri)
    .then(options => dispatch(receivedOptions(options)));
};

export const schema = (uri: string) => (dispatch: (mixed) => Object): Promise<any> => {
  dispatch(requestedSchema());
  return loadSchema(uri)
    .then(schema => dispatch(receivedSchema(schema)));
};
