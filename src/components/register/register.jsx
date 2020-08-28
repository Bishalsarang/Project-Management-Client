import React, { useState } from 'react';
import { Redirect, navigate } from '@reach/router';
import { Form, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import * as constants from '../../constants';

import fetcher from '../../utils/axiosIntercept';
import { isAdmin } from '../../utils/auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('engineer');
  const [firstName, setFirstName] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState('');

  const schema = Yup.object({
    username: Yup.string().max(20, 'Username must be 20 characters or less').required('Username is required'),
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
          .catch((err) => setErrors(err));
      } else {
        const data = { firstname: firstName, lastname: lastName, username, password, role };

        fetcher
          .post(constants.API_REGISTER_URL, data)
          .then((res) => {
            setSuccess(res.data.message);
            setErrors('');
          })
          .catch((err) => {
            setSuccess('');
            setErrors(err.response.data.message);
          });
      }
    });

    setValidated(true);
  };

  const handleClickHome = () => {
    navigate(constants.ROUTES.home);
  };

  // THis route is allowed for admin only
  if (!isAdmin()) {
    return <Redirect to={constants.ROUTES.projects} noThrow></Redirect>;
  }

  return (
    <div className="register">
      <h3 className="text-center">Register</h3>
      <Form
        noValidate
        validated={validated}
        className="register-form  w-50 col-md-6 offset-md-3 col pt-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        {errors && <Alert variant="danger">{errors}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group controlId="firstname">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter firstname"
            name="firstname"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">Firstname is required</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter lastname"
            name="lastname"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">Lastname is required</Form.Control.Feedback>
        </Form.Group>
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
        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" defaultValue="engineer" onChange={(e) => setRole(e.target.value)}>
            <option value="team_leader">Team Leader</option>
            <option value="engineer">Engineer</option>
            <option value="project_manager">Project Manager</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="Submit">
          Submit
        </Button>

        <Button variant="primary" onClick={handleClickHome}>
          Goto Home
        </Button>
      </Form>
    </div>
  );
};

export default Register;
