import React, { useState, useEffect } from 'react';

import { Card } from 'react-bootstrap';
import { API_TASKS_URL, API_USERS_URL } from '../../constants';

import fetcher from '../../utils/axiosIntercept';

const TaskItem = ({ id, title, description, deadline }) => {
  const [assignedUser, setAssignedUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetcher.get(API_TASKS_URL + id + '/users');

      const userId = users.data.data.filter((user) => user.is_assigned)[0].user_id;

      const user = await fetcher.get(API_USERS_URL + userId);

      setAssignedUser(user.data.data[0].username);
    };

    fetchData();
  }, []);

  return (
    <Card className="task-item">
      <Card.Body>
        <Card.Title className="text-center">
          <h4 className="text-primary">{title}</h4>
        </Card.Title>

        <Card.Text>{description}</Card.Text>
        <Card.Text>Assigned to: {assignedUser}</Card.Text>
        <Card.Text>{deadline}</Card.Text>
        <Card.Link href="#">Update</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;
