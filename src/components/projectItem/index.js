import React from 'react';

import { Card } from 'react-bootstrap';

const ProjectItem = ({ id, title, description, created_at }) => {
  return (
    <Card className="project-item">
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Card.Text>{description}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <Card.Link href="#">Update</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ProjectItem;
