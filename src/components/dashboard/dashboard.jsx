import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../common/Header';

import ProjectList from '../projectList';

const Dashboard = () => {
  return (
    <>
      <Header />
      <Container className="dashboard">
        <ProjectList />
      </Container>
    </>
  );
};

export default Dashboard;
