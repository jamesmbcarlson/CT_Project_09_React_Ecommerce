import React from 'react'

import { Modal, Button } from 'react-bootstrap'

function ModalComponent(props) {
    const {show, title, message, close} = props;

  return (
    <Modal show={show} onHide={() => {close()}}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={() => {close()}}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalComponent
