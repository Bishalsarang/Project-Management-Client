import { FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE } from '../actions/projectAction';

const INITIAL_STATE = {
  isLoading: false,
  projects: [],
  error: '',
};

const readProjectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_PROJECT_SUCCESS:
      return { ...state, isLoading: false, user: action.payload.projects };
    case FETCH_PROJECT_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default readProjectReducer;
