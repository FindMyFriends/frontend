// @flow
import {
  RECEIVED_SCHEMA,
  REQUESTED_SCHEMA,
  RECEIVED_SCHEMA_OPTIONS,
  REQUESTED_SCHEMA_OPTIONS,
} from './actions';

type stateType = {|
  +options: ?Object,
  +schema: ?Object,
  +scope: ?string,
|};
const initState = {
  options: null,
  schema: null,
  scope: null,
};
export const schema = (state: stateType = initState, action: Object) => {
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
    case REQUESTED_SCHEMA_OPTIONS:
      return {
        ...state,
        [action.scope]: {
          fetching: action.fetching,
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
