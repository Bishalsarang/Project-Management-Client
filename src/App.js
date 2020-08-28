import React from 'react';
import { Router } from '@reach/router';

import Login from './components/login';
import Register from './components/register';
import taskList from './components/taskList';
import Dashboard from './components/dashboard';
import NotFound from './components/common/404';

import PrivateRoute from './components/privateRoute';
import ProjectForm from './components/common/projectForm';

import { ROUTES } from './constants';

import './App.css';

const App = () => {
  return (
    <Router>
      <Login path={ROUTES.login} />

      {/* Only admin has access to register */}
      <Register path={ROUTES.register} />
      <PrivateRoute as={Dashboard} path={ROUTES.projects}></PrivateRoute>
      <PrivateRoute as={Dashboard} path={ROUTES.home}></PrivateRoute>
      <PrivateRoute as={taskList} path={ROUTES.projectsTasks}></PrivateRoute>
      {/* Only admin is allowed to add project */}
      <PrivateRoute as={ProjectForm} path={ROUTES.projectAdd} mode="create"></PrivateRoute>

      <PrivateRoute as={ProjectForm} path={ROUTES.projectEdit} mode="update"></PrivateRoute>

      {/* <PrivateRoute as={TaskForm} path={ROUTES.taskAdd} mode="create"></PrivateRoute> */}

      <NotFound default />
    </Router>
  );
};

export default App;
