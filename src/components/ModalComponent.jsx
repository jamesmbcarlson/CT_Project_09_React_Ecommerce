import React from 'react'

import { Modal, Button } from 'react-bootstrap'

function ModalComponent(props) {
    const {show, title, message, close, 
        colorHeaderBg = "bg-warning",
        colorHeaderTxt = "text-dark",
        isConfirmation = false, 
        confirmCallback = null, 
        confirmButtonText = "Confirm",
        closeButtonText = "Close"} = props;


  return (
    <Modal show={show} onHide={() => {close()}}>
    <Modal.Header className={colorHeaderBg} closeButton>
      <Modal.Title className={colorHeaderTxt} >{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer className='d-flex justify-content-center'>
        {(isConfirmation === true) &&
        <Button variant='danger' onClick={confirmCallback}>
            {confirmButtonText}
        </Button>
        } 
      <Button variant="secondary" onClick={() => {close()}}>
            {closeButtonText}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalComponent
