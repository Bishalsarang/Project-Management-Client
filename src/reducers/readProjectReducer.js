import {
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE,
  FETCH_PROJECT_MEMBERS_REQUEST,
  FETCH_PROJECT_MEMBERS_SUCCESS,
  FETCH_PROJECT_MEMBERS_FAILURE,
} from '../actions/projectAction';

const PROJECT_INITIAL_STATE = {
  isLoading: false,
  projects: [],
  error: '',
};

const PROJECT_MEMBERS_INITIAL_STATE = {
  isLoading: false,
  members: [],
  error: '',
};

const readProjectReducer = (state = PROJECT_INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_PROJECT_SUCCESS:
      return { ...state, isLoading: false, projects: action.payload.projects };
    case FETCH_PROJECT_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
};

const getProjectMembersReducer = (state = PROJECT_MEMBERS_INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROJECT_MEMBERS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_PROJECT_MEMBERS_SUCCESS:
      return { ...state, isLoading: false, user: action.payload.members };
    case FETCH_PROJECT_MEMBERS_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
};

export { readProjectReducer, getProjectMembersReducer };
