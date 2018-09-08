// @flow
import { isEmpty } from 'lodash';
import { getPrettyDescription } from '../description/selects';
import { EVOLUTION } from './actions';

export const getPrettyEvolution = (evolution: ?Object, options: ?Object): Object => {
  if (evolution && options) {
    return getPrettyDescription(evolution, options);
  }
  return { };
};

export const fetchedAll = (state: Object): boolean => !isEmpty(state.evolution.all.payload);

export const fetchedSingle = (id: string, state: Object) => (
  state.evolution.single[id] ? !isEmpty(state.evolution.single[id].payload) : false
);

export const getById = (id: string, state: Object): Object => (
  state.evolution.single[id] ? state.evolution.single[id].payload : {}
);

export const singleFetching = (id: string, state: Object): boolean => (
  state.evolution.single[id] ? state.evolution.single[id].fetching : true
);

export const allFetching = (state: Object): boolean => state.evolution.all.fetching;

export const getTotal = (state: Object): number => state.evolution.total;

export const mostPriorColumnIdentifiers = (columns: Object): Array<string> =>
  Object.keys(columns).slice(0, 3);

export const getScopeOptions = (state: Object): Object => (
  state.schema[EVOLUTION] && state.schema[EVOLUTION].options
    ? state.schema[EVOLUTION].options.options
    : {}
);

export const getScopeAvailableColumns = (state: Object): ?Object => (
  state.schema[EVOLUTION] && state.schema[EVOLUTION].options
    ? state.schema[EVOLUTION].options.columns
    : null
);

export const getColumns = (state: Object): Object => state.evolution.columns;
