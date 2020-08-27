import { FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_FAILURE } from '../actions/taskAction';

const INITIAL_STATE = {
  isLoading: false,
  tasks: [],
  error: '',
};

const readTaskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TASK_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_TASK_SUCCESS:
      return { ...state, isLoading: false, user: action.payload.tasks };
    case FETCH_TASK_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default readTaskReducer;
