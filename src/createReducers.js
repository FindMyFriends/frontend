import { combineReducers } from 'redux';
import { demand, schema as demandSchema } from './demands/reducers';

const createReducers = combineReducers({
  demand,
  demandSchema,
});

export default createReducers;
