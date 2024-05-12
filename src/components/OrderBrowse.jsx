import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import NavBar from './NavBar'
import OrderCard from './OrderCard';
import ModalComponent from './ModalComponent';
import '../App.css';

function OrderBrowse() {

  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [orderList, setOrderList] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(true);
  const [showAfterDeletion, setShowAfterDeletion] = useState(false);

  // get date in same format at Order data to determine delivery
  const date = new Date();
  const year = date.getFullYear();
  const month = String((date.getMonth() + 1)).padStart(2,"0");
  const day = String(date.getDate()).padStart(2,"0");
  const dateToday = `${year}-${month}-${day}`;

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
    setModalMessage("Are you sure you want to delete this order?");
    setModalNeedsConfirmation(true);
    setModalConfirmCallback(() => () => deleteOrder(idToDelete));
    setModalConfirmText("Delete");
    setModalCloseText("Cancel");
    setShowModal(true);
  }

  // delete order with given ID
  const deleteOrder = async (idToDelete) => {

    const response = await axios.delete(`http://127.0.0.1:5000/orders/${idToDelete}`);
    
    setShowModal(false);
    setModalNeedsConfirmation(false);
    setModalConfirmCallback(null);
    setModalConfirmText("Confirm");
    setModalCloseText("Close");

    if(response.status === 200) {
      setModalTitle('Success');
      setModalMessage(`Order with ID: ${idToDelete} has successfully been deleted.`)
      setOrderData({ name: "", email: "", phone: "" });
    } else {
      setModalTitle('ERROR');
      setModalMessage('Something went wrong!');
    }
      setShowModal(true);
  }

  // fetch order data to read
  const {id} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      // fetch data for single order 
      if(id) {
        const response = await axios.get(`http://127.0.0.1:5000/orders/${id}`);
        console.log(response.data);
        if(Object.keys(response.data).length === 0) {
          setModalTitle('WARNING');
          setModalMessage(`No order found with ID: ${id}`)
          setShowModal(true);
        } else {
          setOrderData(response.data);
        }
      }
      // fetch data for all orders
      else {
        const response = await axios.get('http://127.0.0.1:5000/orders');
        console.log(response.data);
        setOrderList(response.data);
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
      <div className='browse-content'>
      {orderList ? 
      // display all orders
      <div>
        <h1>Orders</h1> 
        <div className='btn-add'>
          <Button href='/order/add'>Add Order</Button>
        </div>

          {orderList.map(order => (
            <OrderCard key={order.order_id} orderData={order} refreshCallback={refresh} dateToday={dateToday}/>
          ))}

          </div>
        :
        // post-deletion message
        (showAfterDeletion) ?
        <h1>Order has been deleted.</h1>
        :
        // no user to display
        (orderData.order_id === undefined) ?
        <p>No Order Found with ID: {id}</p> 
        :
        // display only one order by ID
        <div>
          <h1>Order: {orderData.name} (ID: {orderData.order_id})</h1>
          <OrderCard orderData={orderData} refreshCallback={updateDisplayAfterDeletion} dateToday={dateToday}/>
        </div>
        }
      <ModalComponent show={showModal} title={modalTitle} message={modalMessage} close={handleClose}
              isConfirmation ={modalNeedsConfirmation} 
              confirmCallback ={modalConfirmCallback}
              confirmButtonText = {modalConfirmText}
              closeButtonText = {modalCloseText} />
      </div>
    </div>
  )
}

export default OrderBrowse
