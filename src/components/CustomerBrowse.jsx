import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import NavBar from './NavBar'
import CustomerCard from './CustomerCard';
import ModalComponent from './ModalComponent';

function CustomerBrowse() {

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [customerList, setCustomerList] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(true);
  const [showAfterDeletion, setShowAfterDeletion] = useState(false);

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

  // display deletion confirmation
  const showDeleteWarning = (idToDelete) => {
    setModalTitle("WARNING");
    setModalMessage("Are you sure you want to delete this customer?");
    setModalNeedsConfirmation(true);
    setModalConfirmCallback(() => () => deleteCustomer(idToDelete));
    setModalConfirmText("Delete");
    setModalCloseText("Cancel");
    setShowModal(true);
  }

  // delete customer with given ID
  const deleteCustomer = async (idToDelete) => {
    console.log("DEBUG: deleteCustomer called")

    const response = await axios.delete(`http://127.0.0.1:5000/customers/${idToDelete}`);
    
    setShowModal(false);
    setModalNeedsConfirmation(false);
    setModalConfirmCallback(null);
    setModalConfirmText("Confirm");
    setModalCloseText("Close");

    if(response.status === 200) {
      setModalTitle('Success');
      setModalMessage(`Customer with ID: ${idToDelete} has successfully been deleted.`)
      setCustomerData({ name: "", email: "", phone: "" });
    } else {
      setModalTitle('ERROR');
      setModalMessage('Something went wrong!');
    }
      setShowModal(true);
  }

  // fetch customer data to read
  const {id} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      // fetch data for single customer 
      if(id) {
        const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
        console.log(response.data);
        if(Object.keys(response.data).length === 0) {
          setModalTitle('WARNING');
          setModalMessage(`No customer found with ID: ${id}`)
          setShowModal(true);
        } else {
          setCustomerData(response.data);
        }
      }
      // fetch data for all customers
      else {
        const response = await axios.get('http://127.0.0.1:5000/customers');
        console.log(response.data);
        setCustomerList(response.data);
      }
    }
    fetchData();
  }, [id, refreshTrigger])

  // refresh list after deletion (when displaying all)
  const refresh = () => {
    setRefreshTrigger(!refreshTrigger);
  }

  // display message post deletion (when displaying one)
  const updateDisplayAfterDeletion = () => {
    setShowAfterDeletion(true);
  }

  return (
    <div>
      <NavBar/>
      {customerList ? 
      // display all customers
      <div>
        <h1>Customers</h1> 
          <Button href='/customer/add'>Add Customer</Button>

          {customerList.map(customer => (
            <CustomerCard key={customer.customer_id} customerData={customer} refreshCallback={refresh}/>
          ))}

          </div>
        :
        // post-deletion message
        (showAfterDeletion) ?
        <h1>Customer has been deleted.</h1>
        :
        // no user to display
        (customerData.customer_id === undefined) ?
        <h1>No Customer Found with ID: {id}</h1> 
        :
        // display only one customer by ID
        <div>
          <h1>Customer: {customerData.name} (ID: {customerData.customer_id})</h1>
          <CustomerCard customerData={customerData} refreshCallback={updateDisplayAfterDeletion}/>
        </div>
        }
      <ModalComponent show={showModal} title={modalTitle} message={modalMessage} close={handleClose}
              isConfirmation ={modalNeedsConfirmation} 
              confirmCallback ={modalConfirmCallback}
              confirmButtonText = {modalConfirmText}
              closeButtonText = {modalCloseText} />
    </div>
  )
}

export default CustomerBrowse
