import React from 'react';
import { navigate } from '@reach/router';
import { Navbar, Nav } from 'react-bootstrap';

import { ROUTES } from '../../../constants';

import { isAdmin } from '../../../utils/auth';
import { removeValue, getValue } from '../../../utils/localstorage';

const Header = () => {
  const handleLogOut = () => {
    removeValue('token');
    removeValue('username');
    removeValue('role');
    navigate(ROUTES.login);
  };

  const handleRegister = () => {
    navigate(ROUTES.register);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Project Management Soft</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {isAdmin() && <Nav.Link onClick={handleRegister}>Add Users</Nav.Link>}
        <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
        <Navbar.Text>
          Signed in as: <a href="#login">{getValue('role')}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
