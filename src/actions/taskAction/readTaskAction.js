import fetcher from '../../utils/axiosIntercept';

import * as constants from '../../constants';

export const FETCH_TASK_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_TASK_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_PROJECT_FAILURE';

export const fetchTaskRequest = () => ({
  type: FETCH_TASK_REQUEST,
});

export const fetchTaskSuccess = (tasks) => ({
  type: FETCH_TASK_SUCCESS,
  payload: { tasks },
});

export const fetchTaskFailure = (error) => ({ type: FETCH_TASK_FAILURE, payload: { error } });

export const readTask = (projectId) => {
  return async (dispatch) => {
    dispatch(fetchTaskRequest());

    try {
      //  Get all tasks inside project
      const res = await fetcher.get(constants.API_GET_PROJECTS_URL + projectId + '/tasks');

      const { data } = res.data;

      dispatch(fetchTaskSuccess(data));

      return data;
    } catch (error) {
      dispatch(fetchTaskFailure(error));
    }
  };
};
