import { combineReducers } from 'redux';
import { demand, schema as demandSchema } from './demands/reducers';
import { message } from './ui/reducers';
import { schema as descriptionSchema } from './description/reducers';

const createReducers = combineReducers({
  demand,
  demandSchema,
  descriptionSchema,
  message,
});

export default createReducers;
