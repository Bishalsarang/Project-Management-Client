import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Link, navigate } from '@reach/router';
import { Card, Button, ButtonToolbar, Modal, Form } from 'react-bootstrap';

import fetcher from '../../utils/axiosIntercept';
import { API_PROJECTS_URL, ROLES, ROUTES } from '../../constants';

import MembersTable from '../membersTable';
import * as userActions from '../../actions/userAction';
import * as projectActions from '../../actions/projectAction';

import './style.css';

const ProjectItem = ({ id, title, description, createdAt, ...props }) => {
  const [show, setShow] = useState(false);
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [membersList, setMembersList] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(props.error);

  const handleDelete = () => {
    //  fetcher
    //    .delete(API_PROJECTS_URL + id)
    //    .then((res) => setDeleteStatus(true))
    //    .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    navigate('/projects/' + id + '/edit');
  };

  const handleAddMembers = () => {
    const data = { user_id: userId, project_id: id };

    fetcher.post(API_PROJECTS_URL + id + '/users', data).then((res) => {
      setShowAddMembers(false);
      navigate(ROUTES.projects);
    });
  };

  useEffect(() => {
    //  Call API
    props
      .getProjectMembers(id)
      .then((data) => setMembersList(data))
      .catch((err) => setError(err));

    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.users) {
      setUsers(props.users.filter((user) => user.role !== ROLES.admin && user.role !== ROLES.projectManager));
    }
  }, [props.users]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddMembers = () => setShowAddMembers(false);
  const handleShowAddMembers = () => setShowAddMembers(true);

  return (
    <div className="project-item neumo-element">
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Card.Text>{description}</Card.Text>
        <Card.Text>{createdAt}</Card.Text>
        <ButtonToolbar>
          <Button className="mr-3 mb-2 btn-success" onClick={handleShow}>
            View
          </Button>
          <Button className="mr-3 mb-2" onClick={handleUpdate}>
            Update
          </Button>
          <Button className="mr-3 mb-2 btn-danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button className="mr-3 mb-2 btn-primary" onClick={handleShowAddMembers}>
            Add members
          </Button>

          <Link to={`/project/${id}/tasks`}>
            <Button>Show all tasks</Button>
          </Link>
        </ButtonToolbar>
      </Card.Body>

      {/* Project Item View */}
      <Modal size="xl" show={show} onHide={handleClose} backdrop="static" keyboard={false} className="">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {description}
          <h3 className="text-center">Members </h3>
          <MembersTable membersList={membersList} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Add members */}
      <Modal
        size="xl"
        show={showAddMembers}
        onHide={handleCloseAddMembers}
        backdrop="static"
        keyboard={false}
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-center">Add Members </h3>

          <Form>
            <Form.Control as="select" onChange={(e) => setUserId(e.target.value)}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddMembers}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  members: state.getProjectMember.members,

  isFetching: state.getProjectMember.isLoading,

  error: state.getProjectMember.error,

  users: state.getUsers.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => {
    dispatch(userActions.getUsers());
  },
  getProjectMembers: (projectId) => {
    return dispatch(projectActions.getProjectMembers(projectId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItem);
