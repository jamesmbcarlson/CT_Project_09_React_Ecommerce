import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';

import NavBar from './NavBar'
import ModalComponent from './ModalComponent';

function CustomerBrowse() {

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [customerList, setCustomerList] = useState(null);

  // modal hooks
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

    // close modal
  const handleClose = () => setShowModal(false);

  // delete button
  const deleteButton = () => {
    setModalTitle("WARNING");
    setModalMessage("Are you sure you want to delete this contact?");
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
          setModalMessage(`No customer found with ID ${id}`)
          setShowModal(true);
        } else {
          setCustomerData(response.data);
          console.log('YAY CUSTOMER DATA');
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
  }, [id])

  return (
    <div>
      <NavBar/>
      {customerList ? 
        <h1>Customers</h1> 
        :
        <div>
          <h1>Customer: {customerData.name} (ID: {customerData.customer_id})</h1>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Name: {customerData.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Customer ID: {customerData.customer_id}</Card.Subtitle>
              <Card.Text>
                <p>Email: {customerData.email}</p>
                <p>Phone: {customerData.phone}</p>
              </Card.Text>
              <Card.Link href={`/customer/edit/${customerData.customer_id}`}>Edit</Card.Link>
              <Card.Link onClick={deleteButton}>Delete</Card.Link>
            </Card.Body>
          </Card>
        </div>
      }
      <ModalComponent show={showModal} title={modalTitle} message={modalMessage} close={handleClose} />
    </div>
  )
}

export default CustomerBrowse
