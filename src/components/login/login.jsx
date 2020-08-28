import React, { useState, useEffect } from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';

import { Form, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import { loginUser, LOGIN_USER_FAILURE } from '../../actions/authAction';

import { ROUTES } from '../../constants';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setAuth] = useState(localStorage.getItem('token'));
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState('');

  const schema = Yup.object({
    username: Yup.string(), // .max(20, 'Username must be 15 characters or less').required('Username is required'),
    password: Yup.string(), // .min(8, 'Password must be 8 characters or more').required('Password is required'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    schema.isValid({ username, password }).then((valid) => {
      //  If invalid data
      if (!valid) {
        schema
          .validate(
            {
              username,
              password,
            },
            { abortEarly: false },
          )
          .catch((err) => setErrors(err));
      } else {
        props
          .dispatch(loginUser(username, password))
          .then((res) => {
            if (res.type === LOGIN_USER_FAILURE) {
              setErrors(res.payload.error.response.data.message);
            } else {
              setAuth(true);
            }
          })
          .catch((err) => {
            setErrors(err.response.data.message);
          });
      }
    });

    setValidated(true);
  };

  if (isAuth) {
    return <Redirect to={'..' + ROUTES.projects} noThrow />;
  }

  return (
    <div className="login">
      <Form
        noValidate
        validated={validated}
        className="login-form  w-50 col-md-6 offset-md-3 col pt-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        {errors && <Alert variant="danger">{errors}</Alert>}
        <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">Username is required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="Submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  isLoading: state.login.isLoading,
  error: state.login.error,
});

export default connect(mapStateToProps)(Login);
