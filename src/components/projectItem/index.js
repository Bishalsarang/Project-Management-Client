import React, { useState, useEffect } from 'react';

import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { Card, Button, ButtonToolbar, Modal } from 'react-bootstrap';
import * as projectActions from '../../actions/projectAction';

import MembersTable from '../membersTable';

import './style.css';

const ProjectItem = ({ id, title, description, createdAt, ...props }) => {
  const [show, setShow] = useState(false);
  const [membersList, setMembersList] = useState([]);
  const [error, setError] = useState(props.error);

  useEffect(() => {
    //  Call API
    props
      .getProjectMembers(id)
      .then((data) => setMembersList(data))
      .catch((err) => setError(err));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Button className="mr-3 mb-2">Update</Button>
          <Button className="mr-3 mb-2 btn-danger">Delete</Button>
          <Link to={`/project/${id}/tasks`}>
            <Button>Show all tasks</Button>
          </Link>
        </ButtonToolbar>
      </Card.Body>

      {/* Project Item View */}
      <Modal size="xl" show={show} onHide={handleClose} backdrop="static" keyboard={false} className="">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {description}
          <h2>Members </h2>
          <MembersTable membersList={membersList} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  members: state.getProjectMember.members,

  isFetching: state.getProjectMember.isLoading,

  error: state.getProjectMember.error,
});

const mapDispatchToProps = (dispatch) => ({
  getProjectMembers: (projectId) => {
    return dispatch(projectActions.getProjectMembers(projectId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItem);
