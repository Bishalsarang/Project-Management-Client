// React ROUTE paths
export const ROUTES = {
  login: '/login',
  register: '/register',
  home: '/',
  dashboard: '/dashboard',
  projects: '/projects',
  projectsTasks: '/project/:projectId/tasks',
  projectAdd: '/projects/add',
  projectEdit: '/projects/:projectId/edit',
};

export const API_BASE_URL = 'http://127.0.0.1:3033/api/';
export const API_LOGIN_URL = API_BASE_URL + 'auth/login/';

export const API_GET_PROJECTS_URL = API_BASE_URL + 'projects/';
export const API_PROJECTS_URL = API_BASE_URL + 'projects/';
export const API_USERS_URL = API_BASE_URL + 'users/';

export const API_GET_TASKS_URL = API_BASE_URL + 'tasks/';
