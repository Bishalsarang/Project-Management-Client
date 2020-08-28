import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddMemberModal = ({ users, title, setUserId, showAddMembers, handleCloseAddMembers, handleAddMembers }) => {
  return (
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
            {users &&
              users.map((user) => (
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
  );
};

export default AddMemberModal;
