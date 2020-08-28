import { ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE } from '../actions/taskAction/addTaskAction';

const INITIAL_STATE = {
  isLoading: false,
  error: '',
};

const addTaskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ADD_TASK_SUCCESS:
      return { ...state, isLoading: false };
    case ADD_TASK_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default addTaskReducer;
