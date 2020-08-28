import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import fetcher from '../../../utils/axiosIntercept';

import * as userActions from '../../../actions/userAction';
import * as projectActions from '../../../actions/projectAction';

import MembersTable from '../../membersTable';
import { API_PROJECTS_URL, ROUTES } from '../../../constants';
import { navigate } from '@reach/router';

const ProjectForm = (props) => {
  const [managers, setManagers] = useState([]);
  const [projectInfo, setProjectInfo] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [manager, setManager] = useState('');

  // title, description, manager
  const { users, isLoading, error, mode, projects, projectId } = props;

  useEffect(() => {
    props.getUsers();
    props.readProject();
  }, []);

  useEffect(() => {
    setManagers(users.filter((user) => user.role === 'project_manager'));
  }, [users]);

  useEffect(() => {
    setProjectInfo(projects.filter((project) => project.id === parseInt(projectId))[0]);
  }, [projects]);

  useEffect(() => {
    if (projectInfo) {
      setTitle(projectInfo.title);
      setDescription(projectInfo.description);
    }
  }, [projectInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, manager } = e.target.elements;

    const data = {
      title: title.value,
      description: description.value,
      user_id: manager.value.split(':')[0],
    };

    //  If mode == create then make a POST request
    if (mode === 'create') {
      fetcher
        .post(API_PROJECTS_URL, data)
        .then((res) => {
          navigate(ROUTES.projects);
        })
        .catch((err) => console.log('failed'));
    }
    //  Make a PUT request
    if (mode === 'update') {
      fetcher
        .put(API_PROJECTS_URL + props.projectId, data)
        .then((res) => {
          navigate(ROUTES.projects);
        })
        .catch((err) => console.log('failed'));
    }
  };

  if (error) {
    return <div>{error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Container className="mt-3">
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* Title */}
        <Form.Row>
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
            />
          </Form.Group>
        </Form.Row>
        {/* Description */}
        <Form.Row>
          <Form.Group as={Col} controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control value={description} type="text" placeholder="Enter project description" />
          </Form.Group>
        </Form.Row>
        {/* Manager  */}
        <Form.Row>
          <Form.Group as={Col} controlId="manager">
            <Form.Label>Manager</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
              {managers.map((manager) => (
                <option key={manager.id}>
                  {manager.id}: {manager.username}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        {/* Members */}
        <Form.Row>
          <Form.Group as={Col} controlId="members">
            <MembersTable membersList={[]} />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  users: state.getUsers.users,

  isLoading: state.getUsers.isLoading,

  error: state.getUsers.error,

  members: state.getProjectMember.members,

  projects: state.readProject.projects,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => {
    dispatch(userActions.getUsers());
  },
  getProjectMembers: (projectId) => {
    return dispatch(projectActions.getProjectMembers(projectId));
  },
  readProject: () => {
    dispatch(projectActions.readProject());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
