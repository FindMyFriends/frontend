// @flow
import {
  receivedOptions,
  requestedOptions,
  receivedSchema,
  requestedSchema,
} from './actions';
import { loadOptions, loadSchema } from '../api/schema';
import { fetchedSchema, fetchedOptions, getScopeOptions } from './reducers';

export const options = (
  uri: string,
  scope: string,
  next: (?Object) => (void) = () => {},
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedOptions(getState(), scope)) {
    next(getScopeOptions(getState(), scope));
    return;
  }
  dispatch(requestedOptions(scope));
  loadOptions(
    uri,
    options => Promise.resolve()
      .then(() => dispatch(receivedOptions(options, scope)))
      .then(() => next(options)),
  );
};

export const schema = (
  uri: string,
  scope: string,
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedSchema(getState(), scope)) return;
  dispatch(requestedSchema(scope));
  loadSchema(uri)
    .then(schema => dispatch(receivedSchema(schema, scope)));
};
