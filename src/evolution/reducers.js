import * as R from 'ramda';
import { getPrettyDescription } from './../description/selects';
import {
  RECEIVED_ALL_EVOLUTIONS,
  RECEIVED_PAGINATION_FOR_ALL_EVOLUTIONS,
  RECEIVED_SINGLE_EVOLUTION,
  RECEIVED_EVOLUTION_OPTIONS,
  RECEIVED_EVOLUTION_SCHEMA,
  EXTENDED_EVOLUTION,
} from './actions';

export const evolution = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_SINGLE_EVOLUTION:
      return { ...state, single: action.evolution, etag: action.etag };
    case RECEIVED_ALL_EVOLUTIONS:
      return { ...state, all: action.evolutions };
    case RECEIVED_PAGINATION_FOR_ALL_EVOLUTIONS:
      return { ...state, pages: action.pages };
    case RECEIVED_EVOLUTION_OPTIONS:
      return { ...state, options: action.options };
    case RECEIVED_EVOLUTION_SCHEMA:
      return { ...state, schema: action.schema };
    case EXTENDED_EVOLUTION:
      return { ...state, single: null };
    default:
      return state;
  }
};

export const getPrettyEvolution = (evolution, options) => {
  if (R.isEmpty(evolution) || R.isEmpty(options)) {
    return { };
  }
  return getPrettyDescription(evolution, options);
};
