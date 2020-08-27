import fetcher from '../../utils/axiosIntercept';

import * as constants from '../../constants';

export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';

export const createProjectRequest = () => ({
  type: CREATE_PROJECT_REQUEST,
});

export const createProjectSuccess = (project) => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: { project },
});

export const createProjectFailure = (error) => ({ type: CREATE_PROJECT_FAILURE, payload: { error } });

export const createProject = (title, description, managerId) => {
  return async (dispatch) => {
    dispatch(createProjectRequest());

    try {
      const data = { title, description, manager_id: managerId };

      await fetcher.post(constants.API_PROJECTS_URL, data);

      dispatch(createProjectSuccess(data));

      return data;
    } catch (error) {
      dispatch(createProjectFailure(error));
    }
  };
};
