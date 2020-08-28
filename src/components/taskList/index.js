import React, { useState, useEffect } from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import TaskItem from '../taskItem';

import * as taskAction from '../../actions/taskAction';

const TaskList = (props) => {
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    //  Call API
    props
      .readTask(props.projectId)
      .then((data) => setTaskList(data))
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (props.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Container>
      <h3 className="text-center">Task List</h3>
      <ListGroup>
        {taskList.map(({ id, title, description, deadline }) => (
          <TaskItem key={id} id={id} title={title} description={description} deadline={deadline} />
        ))}
      </ListGroup>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.readTask.tasks,
  isLoading: state.readTask.isLoading,
  error: state.readTask.error,
});

const mapDispatchToProps = (dispatch) => ({
  readTask: (projectId) => {
    return dispatch(taskAction.readTask(projectId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
