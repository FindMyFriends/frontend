// @flow
import {
  RECEIVED_SCHEMA,
  REQUESTED_SCHEMA,
  RECEIVED_SCHEMA_OPTIONS,
  REQUESTED_SCHEMA_OPTIONS,
} from './actions';

export default (state: Object = {}, action: Object) => {
  switch (action.type) {
    case RECEIVED_SCHEMA_OPTIONS:
      return {
        ...state,
        [action.scope]: {
          ...state[action.scope],
          options: action.options,
          fetching: action.fetching,
        },
      };
    case RECEIVED_SCHEMA:
      return {
        ...state,
        [action.scope]: {
          ...state[action.scope],
          schema: action.schema,
          fetching: action.fetching,
        },
      };
    case REQUESTED_SCHEMA:
      return {
        ...state,
        [action.scope]: {
          ...state[action.scope],
          fetching: action.fetching,
          schema: {},
        },
      };
    case REQUESTED_SCHEMA_OPTIONS:
      return {
        ...state,
        [action.scope]: {
          ...state[action.scope],
          fetching: action.fetching,
          options: {},
        },
      };
    default:
      return state;
  }
};
