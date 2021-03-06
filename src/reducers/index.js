/**
 * Entry point for Reducers: reducers/index.js.
 * Export  Combined  Reducers.
 */
import { combineReducers } from 'redux';

import loginReducer from './loginReducer';

import { readProjectReducer, getProjectMembersReducer } from './readProjectReducer';
import readTaskReducer from './readTaskReducer';
import getUsersReducer from './getUsersReducer';
import addTaskReducer from './addTaskReducer';

const reducer = combineReducers({
  login: loginReducer,
  addTask: addTaskReducer,
  getUsers: getUsersReducer,
  readTask: readTaskReducer,
  readProject: readProjectReducer,
  getProjectMember: getProjectMembersReducer,
});

export default reducer;
