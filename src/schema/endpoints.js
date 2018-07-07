// @flow
import {
  receivedOptions,
  requestedOptions,
  receivedSchema,
  requestedSchema,
} from './actions';
import { loadOptions, loadSchema } from '../api/schema';

export const options = (
  uri: string,
  scope: string,
  next: () => (void) = () => null,
) => (dispatch: (mixed) => Object): Promise<any> => {
  dispatch(requestedOptions(scope));
  return loadOptions(uri)
    .then((options) => {
      dispatch(receivedOptions(options, scope));
      return options;
    })
    .then(next);
};

export const schema = (
  uri: string,
  scope: string,
) => (dispatch: (mixed) => Object): Promise<any> => {
  dispatch(requestedSchema(scope));
  return loadSchema(uri)
    .then(schema => dispatch(receivedSchema(schema, scope)));
};
