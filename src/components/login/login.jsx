import React, { useState } from 'react';
import { Redirect } from '@reach/router';

import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { ROUTES } from '../../constants';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const isAuth = true;

  const schema = Yup.object({
    username: Yup.string().max(20, 'Username must be 15 characters or less').required('Username is required'),
    password: Yup.string().min(8, 'Password must be 8 characters or more').required('Password is required'),
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
          .catch((err) => console.log(err));
      } else {
        // Call Login API
      }
    });

    setValidated(true);
  };

  if (isAuth) {
    return <Redirect to={'..' + ROUTES.dashboard} noThrow />;
  }

  return (
    <div className="login">
      <Form
        noValidate
        validated={validated}
        className="login-form  w-50 col-md-6 offset-md-3 col pt-5"
        onSubmit={(e) => handleSubmit(e)}
      >
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

export default Login;