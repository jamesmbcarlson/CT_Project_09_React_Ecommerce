import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import ModalComponent from './ModalComponent';

function ButtonDeleteProduct(props) {
    const {productData, refreshCallback, buttonText="Delete"} = props;

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
  setModalMessage("Are you sure you want to delete this product?");
  setModalNeedsConfirmation(true);
  setModalConfirmCallback(() => () => deleteProduct(productData.product_id));
  setModalConfirmText("Delete");
  setModalCloseText("Cancel");
  setModalColorHeaderBg("bg-warning");
  setModalColorHeaderTxt("text-dark");
  setShowModal(true);
}

// delete product with given ID
const deleteProduct = async (idToDelete) => {

  const response = await axios.delete(`http://127.0.0.1:5000/products/${idToDelete}`);

  
  setShowModal(false);
  setModalNeedsConfirmation(false);
  setModalConfirmCallback(null);
  setModalConfirmText("Confirm");
  setModalCloseText("Close");
  
  if(response.data.Error) {
    setModalTitle('Error');
    setModalMessage(`Could not delete product with ID: ${idToDelete}. Products already in orders cannot be deleted.`);
    setModalColorHeaderBg("bg-danger");
    setModalColorHeaderTxt("text-light");
  }
  else if(response.status === 200) {
      setModalTitle('Success');
      setModalMessage(`Product with ID: ${idToDelete} has successfully been deleted.`)
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

export default ButtonDeleteProduct
