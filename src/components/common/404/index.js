import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './style.css';
import { navigate } from '@reach/router';
import { ROUTES } from '../../../constants';

const NotFound = () => {
  const handleClick = () => {
    navigate(ROUTES.projects);
  };

  return (
    <Container>
      <Row>
        <Col className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">Sorry, an error has occured, Requested page not found!</div>
            <div className="error-actions">
              <Button className="primary" onClick={handleClick}>
                Take me home
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
