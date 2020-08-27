import React from 'react';
import Login from '../login';

const PrivateRoute = ({ as: Component, ...props }) => {
  const isAuth = true;

  return isAuth ? <Component {...props} /> : <Login />;
};

export default PrivateRoute;
