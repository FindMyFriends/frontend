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
  +fetching: boolean,
|};
const initState = {
  options: null,
  schema: null,
  fetching: true,
};
export const schema = (state: stateType = initState, action: Object) => {
  switch (action.type) {
    case RECEIVED_SCHEMA_OPTIONS:
      return {
        ...state,
        options: action.options,
        fetching: action.fetching,
      };
    case RECEIVED_SCHEMA:
      return {
        ...state,
        schema: action.schema,
        fetching: action.fetching,
      };
    case REQUESTED_SCHEMA:
    case REQUESTED_SCHEMA_OPTIONS:
      return {
        ...state,
        fetching: action.fetching,
      };
    default:
      return state;
  }
};
