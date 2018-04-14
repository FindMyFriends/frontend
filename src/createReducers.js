import { combineReducers } from 'redux';
import { demand } from './demand/reducers';
import { soulmate } from './soulmate/reducers';
import { menu, message } from './ui/reducers';

const createReducers = combineReducers({
  demand,
  soulmate,
  menu,
  message,
});

export default createReducers;
