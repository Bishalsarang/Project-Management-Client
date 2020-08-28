import React from 'react';
import { Router } from '@reach/router';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import taskList from './components/taskList';
import Dashboard from './components/dashboard';
import NotFound from './components/common/404';

import PrivateRoute from './components/privateRoute';
import ProjectForm from './components/common/projectForm';

import { ROUTES } from './constants';
import { isAdmin, isProjectManager } from './utils/auth';

import './App.css';

const App = () => {
  return (
    <Router>
      <Home path={ROUTES.home} />
      <Login path={ROUTES.login} />

      {/* Only admin has access to register */}
      {isAdmin() && <Register path={ROUTES.register} />}
      <PrivateRoute as={Dashboard} path={ROUTES.projects}></PrivateRoute>
      <PrivateRoute as={taskList} path={ROUTES.projectsTasks}></PrivateRoute>
      {/* Only admin is allowed to add project */}
      {isAdmin() && <PrivateRoute as={ProjectForm} path={ROUTES.projectAdd} mode="create"></PrivateRoute>}

      {(isAdmin() || isProjectManager()) && (
        <PrivateRoute as={ProjectForm} path={ROUTES.projectEdit} mode="update"></PrivateRoute>
      )}

      <NotFound default />
    </Router>
  );
};

export default App;
