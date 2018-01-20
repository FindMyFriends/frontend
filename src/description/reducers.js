import {
  RECEIVED_DESCRIPTION_SCHEMA_PROPERTY,
} from './actions';

export const schema = (state = { fetching: false }, action) => {
  switch (action.type) {
    case RECEIVED_DESCRIPTION_SCHEMA_PROPERTY:
      return { ...state, [action.property]: action.value };
    default:
      return state;
  }
};
