import React from 'react';
import Login from '../login';

const PrivateRoute = ({ as: Component, ...props }) => {
  //   Get authentication state from redux
  const isAuth = true;

  return isAuth ? <Component {...props} /> : <Login />;
};

export default PrivateRoute;
