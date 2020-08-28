import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Link, navigate } from '@reach/router';
import { Card, Button, ButtonToolbar, Modal } from 'react-bootstrap';

import fetcher from '../../utils/axiosIntercept';
import { API_PROJECTS_URL, ROLES, ROUTES } from '../../constants';
import { isAdmin, isProjectManager, isTeamLeader } from '../../utils/auth';

import AddTaskModal from '../addTasks';
import MembersTable from '../membersTable';
import AddMemberModal from '../addMembers';

import * as userActions from '../../actions/userAction';
import * as projectActions from '../../actions/projectAction';

import './style.css';

const ProjectItem = ({ id, title, description, createdAt, ...props }) => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(props.error);
  const [membersList, setMembersList] = useState([]);
  const [showAddTasks, setShowAddTasks] = useState(false);
  const [showAddMembers, setShowAddMembers] = useState(false);

  const handleDelete = () => {
    fetcher
      .delete(API_PROJECTS_URL + id)
      .then(() => navigate(ROUTES.home))
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    navigate('/projects/' + id + '/edit');
  };

  const handleAddMembers = () => {
    const data = { user_id: userId, project_id: id };

    console.log('hi', userId);
    fetcher.post(API_PROJECTS_URL + id + '/users', data).then(() => {
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

  const handleCloseAddTasks = () => setShowAddTasks(false);
  const handleShowAddTasks = () => setShowAddTasks(true);

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
          {/* Update is only allowed by PM and admin */}
          {(isAdmin() || isProjectManager()) && (
            <Button className="mr-3 mb-2" onClick={handleUpdate}>
              Update
            </Button>
          )}
          {/* Only admin can delete project */}
          {isAdmin() && (
            <Button className="mr-3 mb-2 btn-danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          {(isAdmin() || isProjectManager() || isTeamLeader()) && (
            <Button className="mr-3 mb-2 btn-primary" onClick={handleShowAddMembers}>
              Add members
            </Button>
          )}

          <Button className="mr-3 mb-2 btn-primary" onClick={handleShowAddTasks}>
            Add tasks
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
      <AddMemberModal
        users={users}
        title={title}
        setUserId={setUserId}
        showAddMembers={showAddMembers}
        handleAddMembers={handleAddMembers}
        handleCloseAddMembers={handleCloseAddMembers}
      />
      {/* Add tasks */}
      <AddTaskModal
        users={users}
        projectId={id}
        projectTitle={title}
        showAddTasks={showAddTasks}
        handleCloseAddTasks={handleCloseAddTasks}
      />
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
