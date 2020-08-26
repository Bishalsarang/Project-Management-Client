import React from 'react';
import { Router, Redirect } from '@reach/router';

import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';

import './App.css';
import PrivateRoute from './components/privateRoute';

const App = () => {
  const isAllowed = false;

  return (
    <Router>
      <Login path="/login" />
      <Register path="/register" />
      <PrivateRoute as={Dashboard} path="dashboard"></PrivateRoute>
    </Router>
  );
};

export default App;
