import React from 'react';
import { Router } from '@reach/router';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import NotFound from './components/common/404';

import { ROUTES } from './constants';

import './App.css';
import PrivateRoute from './components/privateRoute';
import taskList from './components/taskList';

const App = () => {
  return (
    <Router>
      <Home path={ROUTES.home} />
      <Login path={ROUTES.login} />

      <Register path={ROUTES.register} />
      <PrivateRoute as={Dashboard} path={ROUTES.project}></PrivateRoute>
      <PrivateRoute as={taskList} path="/project/:projectId/tasks"></PrivateRoute>
      <NotFound default />
    </Router>
  );
};

export default App;
