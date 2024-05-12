import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import ModalComponent from './ModalComponent';

function ButtonCancelOrder(props) {
    const {orderData, refreshCallback, buttonText="Cancel"} = props;

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

// display cancellation confirmation
const showCancelWarning = () => {
  setModalTitle("Warning");
  setModalMessage("Are you sure you want to cancel this order?");
  setModalNeedsConfirmation(true);
  setModalConfirmCallback(() => () => cancelOrder(orderData.order_id));
  setModalConfirmText("Yes");
  setModalCloseText("No");
  setModalColorHeaderBg("bg-warning");
  setModalColorHeaderTxt("text-dark");
  setShowModal(true);
}

// cancel with given ID
const cancelOrder = async (idToCancel) => {
  console.log("DEBUG: cancelOrder called from ButtonCancelOrder")

  const response = await axios.put(`http://127.0.0.1:5000/orders/cancel/${idToCancel}`);

  setShowModal(false);
  setModalNeedsConfirmation(false);
  setModalConfirmCallback(null);
  setModalConfirmText("Confirm");
  setModalCloseText("Close");
  
  if(response.data.Error) {
    setModalTitle('Error');
    setModalMessage(`${response.data.Error}`);
    setModalColorHeaderBg("bg-danger");
    setModalColorHeaderTxt("text-light");
  }
  else if(response.status === 200) {
    setModalTitle('Success');
    setModalMessage(`Order with ID: ${idToCancel} has successfully been cancelled.`)
    setModalColorHeaderBg("bg-success");
    setModalColorHeaderTxt("text-light");
  } 
  else {
    setModalTitle('Error');
    setModalMessage('Something went wrong!');
    setModalColorHeaderBg("bg-danger");
    setModalColorHeaderTxt("text-light");
  }
    setShowModal(true);
    // allow a short delay before refreshing content
    setTimeout( ()=> { refreshCallback(); }, 1500);
}

  return (
    <div>
        <Button variant='outline-danger' onClick={() => showCancelWarning()}>{buttonText}</Button>
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

export default ButtonCancelOrder
