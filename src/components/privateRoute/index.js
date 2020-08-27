import React from 'react';
import { Redirect } from '@reach/router';

const PrivateRoute = ({ as: Component, ...props }) => {
  const isAuth = localStorage.getItem('token');

  return isAuth ? <Component {...props} /> : <Redirect to="/login" noThrow></Redirect>;
};

export default PrivateRoute;
