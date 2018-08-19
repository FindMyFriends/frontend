// @flow
import { isEmpty } from 'lodash';
import {
  RECEIVED_SCHEMA,
  REQUESTED_SCHEMA,
  RECEIVED_SCHEMA_OPTIONS,
  REQUESTED_SCHEMA_OPTIONS,
} from './actions';

export const schema = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case RECEIVED_SCHEMA_OPTIONS:
      return {
        ...state,
        [action.scope]: {
          options: action.options,
          fetching: action.fetching,
        },
      };
    case RECEIVED_SCHEMA:
      return {
        ...state,
        [action.scope]: {
          schema: action.schema,
          fetching: action.fetching,
        },
      };
    case REQUESTED_SCHEMA:
      return {
        ...state,
        [action.scope]: {
          fetching: action.fetching,
          schema: {},
        },
      };
    case REQUESTED_SCHEMA_OPTIONS:
      return {
        ...state,
        [action.scope]: {
          fetching: action.fetching,
          options: {},
        },
      };
    default:
      return state;
  }
};

export const getScopeOptions = (
  state: Object,
  scope: string,
): ?Object => (
  state.schema[scope] ? state.schema[scope].options : null
);

export const isFetching = (
  state: Object,
  scope: string,
): boolean => (
  state.schema[scope] ? state.schema[scope].fetching : true
);

export const fetchedOptions = (state: Object, scope: string): boolean => (
  state.schema[scope] ? !isEmpty(state.schema[scope].options) : false
);

export const fetchedSchema = (state: Object, scope: string): boolean => (
  state.schema[scope] ? !isEmpty(state.schema[scope].schema) : false
);
