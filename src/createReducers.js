import { combineReducers } from 'redux';
import { demand, demands, schema as demandSchema } from './demands/reducers';

const createReducers = combineReducers({
  demand,
  demands,
  demandSchema,
});

export default createReducers;
