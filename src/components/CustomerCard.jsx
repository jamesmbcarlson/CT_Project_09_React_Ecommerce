import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

import ButtonDelete from './ButtonDelete';
import ModalComponent from './ModalComponent';

function CustomerCard(props) {
    const {customerData, refreshCallback} = props;

// modal hooks
const [showModal, setShowModal] = useState(false);
const [modalTitle, setModalTitle] = useState("");
const [modalMessage, setModalMessage] = useState("");
const [modalNeedsConfirmation, setModalNeedsConfirmation] = useState(false);
const [modalConfirmCallback, setModalConfirmCallback] = useState(null);
const [modalConfirmText, setModalConfirmText] = useState('Confirm');
const [modalCloseText, setModalCloseText] = useState('Close');

  // close modal
const handleClose = () => setShowModal(false);

  return (
    <div>
        <Card className="m-4" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Name: {customerData.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Customer ID: {customerData.customer_id}</Card.Subtitle>
                <Card.Text>Email: {customerData.email}</Card.Text>
                <Card.Text>Phone: {customerData.phone}</Card.Text>
                <Card.Footer className='d-flex justify-content-around px-5 bg-transparent'>
                    <Button variant="outline-primary" href={`/customer/edit/${customerData.customer_id}`}>Edit</Button>
                    <ButtonDelete customerData={customerData} refreshCallback={refreshCallback} />
                </Card.Footer>
            </Card.Body>
        </Card>
        <ModalComponent show={showModal} title={modalTitle} message={modalMessage} close={handleClose}
            isConfirmation ={modalNeedsConfirmation} 
            confirmCallback ={modalConfirmCallback}
            confirmButtonText = {modalConfirmText}
            closeButtonText = {modalCloseText} />
    </div>
  )
}

export default CustomerCard
