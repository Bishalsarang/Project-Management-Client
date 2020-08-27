import React, { useState } from 'react';
import { Toast, Modal } from 'react-bootstrap';

const SuccessModal = (props) => {
  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Bootstrap</strong>
        <small>just now</small>
      </Modal.Header>
      <Modal.Body>See? Just like this.</Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
