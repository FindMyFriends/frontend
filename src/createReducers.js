import { combineReducers } from 'redux';
import { demand, schema as demandSchema } from './demands/reducers';
import { schema as descriptionSchema } from './description/reducers';

const createReducers = combineReducers({
  demand,
  demandSchema,
  descriptionSchema,
});

export default createReducers;
