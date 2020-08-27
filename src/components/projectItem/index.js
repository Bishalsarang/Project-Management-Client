import React from 'react';

import { Card, Button, ButtonToolbar } from 'react-bootstrap';

import './style.css';
import { Router, Redirect, Link } from '@reach/router';

const ProjectItem = ({ id, title, description, createdAt }) => {
  return (
    <div className="project-item neumo-element">
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Card.Text>{description}</Card.Text>
        <Card.Text>{createdAt}</Card.Text>
        <ButtonToolbar>
          <Button className="mr-3 mb-2 btn-success">View</Button>
          <Button className="mr-3 mb-2">Update</Button>
          <Button className="mr-3 mb-2 btn-danger">Delete</Button>
          <Link to={`/project/${id}/tasks`}>
            <Button>Show all tasks</Button>
          </Link>
        </ButtonToolbar>
      </Card.Body>
    </div>
  );
};

export default ProjectItem;
