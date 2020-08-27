import React from 'react';

import { Card } from 'react-bootstrap';

import './style.css';

const ProjectItem = ({ id, title, description, createdAt }) => {
  return (
    <Card className="project-item">
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Card.Text>{description}</Card.Text>
        <Card.Text>{createdAt}</Card.Text>
        <Card.Link href="#">Update</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ProjectItem;
