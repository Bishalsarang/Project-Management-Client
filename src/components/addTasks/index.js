import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { Button, Modal, Form, Col, Alert } from 'react-bootstrap';

import { addTask } from '../../actions/taskAction/addTaskAction';
import { getProjectMembers } from '../../actions/projectAction/readProjectAction';

import { ROUTES } from '../../constants/index';

const AddTaskModal = ({ projectId, projectTitle, showAddTasks, handleCloseAddTasks, ...props }) => {
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState(props.error);
  const [description, setDescription] = useState('');
  const [currentProjectUsers, setcurrentProjectUsers] = useState([]);

  useEffect(() => {
    props.getProjectMembers(projectId).then((res) => setcurrentProjectUsers(res));
  }, []);

  useEffect(() => {
    setErrors(props.error);
  }, [props.error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, assignee, deadline } = e.target.elements;

    props
      .addTask({
        project_id: projectId,
        title: title.value,
        deadline: deadline.value,
        description: description.value,
        user_id: assignee.value,
      })
      .then((res) => navigate(ROUTES.home))
      .catch((err) => setErrors(err));
  };

  return (
    <Modal size="xl" show={showAddTasks} onHide={handleCloseAddTasks} backdrop="static" keyboard={false} className="">
      <Modal.Header closeButton>
        <Modal.Title className="text-center">{projectTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errors && <Alert variant="danger">{errors}</Alert>}
        <h3 className="text-center">Add Tasks </h3>

        <Form onSubmit={(e) => handleSubmit(e)}>
          {/* Title */}
          <Form.Row>
            <Form.Group as={Col} controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </Form.Group>
          </Form.Row>
          {/* Description */}
          <Form.Row>
            <Form.Group as={Col} controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
              />
            </Form.Group>
          </Form.Row>
          {/* Assignee  */}
          <Form.Row>
            <Form.Group as={Col} controlId="assignee">
              <Form.Label>Assignee</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                {currentProjectUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control type="date"></Form.Control>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.addTask.isLoading,
  members: state.readProject.members,
  error: state.addTask.error,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (data) => {
    return dispatch(addTask(data));
  },
  getProjectMembers: (projectId) => {
    return dispatch(getProjectMembers(projectId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
