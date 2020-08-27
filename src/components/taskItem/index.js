import React from 'react';

import { Card } from 'react-bootstrap';

const TaskItem = ({ id, title, description, deadline }) => {
  return (
    <Card className="task-item">
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Card.Text>{description}</Card.Text>
        <Card.Text>{deadline}</Card.Text>
        <Card.Link href="#">Update</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;
