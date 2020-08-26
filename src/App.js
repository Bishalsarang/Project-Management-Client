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

const App = () => {
  return (
    <Router>
      <Home path={ROUTES.home} />
      <Login path={ROUTES.login} />
      <Register path={ROUTES.register} />
      <PrivateRoute as={Dashboard} path={ROUTES.dashboard}></PrivateRoute>
      <NotFound default />
    </Router>
  );
};

export default App;
