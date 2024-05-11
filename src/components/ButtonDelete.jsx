import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import ModalComponent from './ModalComponent';

function ButtonDelete(props) {
    const {customerData, refreshCallback, buttonText="Delete"} = props;

// modal hooks
const [showModal, setShowModal] = useState(false);
const [modalTitle, setModalTitle] = useState("");
const [modalMessage, setModalMessage] = useState("");
const [modalNeedsConfirmation, setModalNeedsConfirmation] = useState(false);
const [modalConfirmCallback, setModalConfirmCallback] = useState(null);
const [modalConfirmText, setModalConfirmText] = useState('Confirm');
const [modalCloseText, setModalCloseText] = useState('Close');
const [modalColorHeaderBg, setModalColorHeaderBg] = useState("bg-primary");
const [modalColorHeaderTxt, setModalColorHeaderTxt] = useState("text-light");

  // close modal
const handleClose = () => setShowModal(false);

// display deletion confirmation
const showDeleteWarning = () => {
  setModalTitle("Warning");
  setModalMessage("Are you sure you want to delete this customer?");
  setModalNeedsConfirmation(true);
  setModalConfirmCallback(() => () => deleteCustomer(customerData.customer_id));
  setModalConfirmText("Delete");
  setModalCloseText("Cancel");
  setModalColorHeaderBg("bg-warning");
  setModalColorHeaderTxt("text-dark");
  setShowModal(true);
}

// delete customer with given ID
const deleteCustomer = async (idToDelete) => {
  console.log("DEBUG: deleteCustomer called from ButtonDelete")

  const response = await axios.delete(`http://127.0.0.1:5000/customers/${idToDelete}`);

  
  setShowModal(false);
  setModalNeedsConfirmation(false);
  setModalConfirmCallback(null);
  setModalConfirmText("Confirm");
  setModalCloseText("Close");
  
  if(response.status === 200) {
      setModalTitle('Success');
      setModalMessage(`Customer with ID: ${idToDelete} has successfully been deleted.`)
      setModalColorHeaderBg("bg-success");
      setModalColorHeaderTxt("text-light");
      
      
    } else {
        setModalTitle('Error');
        setModalMessage('Something went wrong!');
        setModalColorHeaderBg("bg-danger");
        setModalColorHeaderTxt("text-light");
        
    }
    setShowModal(true);
    setTimeout( ()=> { refreshCallback(); }, 1500);
}

  return (
    <div>
        <Button variant='outline-danger' onClick={() => showDeleteWarning()}>{buttonText}</Button>
        <ModalComponent show={showModal} title={modalTitle} message={modalMessage} close={handleClose}
            isConfirmation={modalNeedsConfirmation} 
            confirmCallback={modalConfirmCallback}
            confirmButtonText={modalConfirmText}
            closeButtonText={modalCloseText} 
            colorHeaderBg={modalColorHeaderBg} 
            colorHeaderTxt={modalColorHeaderTxt}/>
    </div>
  )
}

export default ButtonDelete
