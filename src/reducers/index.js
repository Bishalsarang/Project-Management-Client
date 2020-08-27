/**
 * Entry point for Reducers: reducers/index.js.
 * Export  Combined  Reducers.
 */
import { combineReducers } from 'redux';

import loginReducer from './loginReducer';

import readProjectReducer from './readProjectReducer';
import readTaskReducer from './readTaskReducer';

const reducer = combineReducers({
  login: loginReducer,
  readProject: readProjectReducer,
  readTask: readTaskReducer,
});

export default reducer;
