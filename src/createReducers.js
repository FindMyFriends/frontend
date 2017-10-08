import { combineReducers } from 'redux';
import demands from './demands/reducer.js';

const createReducers = combineReducers({
  demands,
});

export default createReducers;
