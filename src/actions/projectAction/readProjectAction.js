import fetcher from '../../utils/axiosIntercept';

import * as constants from '../../constants';

export const FETCH_PROJECT_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';

export const FETCH_PROJECT_MEMBERS_REQUEST = 'FETCH_PROJECT_MEMBERS_REQUEST';
export const FETCH_PROJECT_MEMBERS_SUCCESS = 'FETCH_PROJECT_MEMBERS_SUCCESS';
export const FETCH_PROJECT_MEMBERS_FAILURE = 'FETCH_PROJECT_MEMBERS_FAILURE';

export const fetchProjectRequest = () => ({
  type: FETCH_PROJECT_REQUEST,
});

export const fetchProjectSuccess = (projects) => ({
  type: FETCH_PROJECT_SUCCESS,
  payload: { projects },
});

export const fetchProjectFailure = (error) => ({ type: FETCH_PROJECT_FAILURE, payload: { error } });

export const fetchProjectMembersRequest = () => ({
  type: FETCH_PROJECT_MEMBERS_REQUEST,
});

export const fetchProjectMembersSuccess = (members) => ({
  type: FETCH_PROJECT_MEMBERS_SUCCESS,
  payload: { members },
});

export const fetchProjectMembersFailure = (error) => ({ type: FETCH_PROJECT_MEMBERS_FAILURE, payload: { error } });

export const getProjectMembers = (projectId) => {
  return async (dispatch) => {
    dispatch(fetchProjectMembersRequest());

    try {
      const res = await fetcher.get(constants.API_GET_PROJECTS_URL + projectId + '/users');
      const { data } = res.data;

      dispatch(fetchProjectMembersSuccess(data));

      return data;
    } catch (error) {
      dispatch(fetchProjectMembersFailure(error));
    }
  };
};

export const readProject = () => {
  return async (dispatch) => {
    dispatch(fetchProjectRequest());

    try {
      const res = await fetcher.get(constants.API_GET_PROJECTS_URL);
      const { data } = res.data;

      dispatch(fetchProjectSuccess(data));

      return data;
    } catch (error) {
      dispatch(fetchProjectFailure(error.response.data.message));
    }
  };
};
