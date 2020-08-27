import React from 'react';
import { navigate } from '@reach/router';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate(`/login`);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Project Management Soft</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
        <Navbar.Text>
          Signed in as: <a href="#login">{localStorage.getItem('role')}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
