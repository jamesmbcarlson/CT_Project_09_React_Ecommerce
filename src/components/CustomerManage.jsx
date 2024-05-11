import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, FloatingLabel, Button } from "react-bootstrap";

import NavBar from "./NavBar";
import ModalComponent from "./ModalComponent";

// CustomerManage is used to add new customers and edit existing customers
function CustomerManage() {
  // hook for incoming/outgoing customer data
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [action, setAction] = useState("Add Customer");

  // modal hooks
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // close modal
  const handleClose = () => setShowModal(false);

  // id passed through URI
  const { id } = useParams();

  // fetch customer data for editing
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
      console.log(response);

      // check for valid data; warn user if not found; set to customer data if found
      if (response.data.customer_id == undefined) {
        setModalTitle("WARNING");
        setModalMessage(`No customer found with ID: ${id}`);
        setShowModal(true);
      } else {
        setCustomerData(response.data);
        setAction("Edit Customer");
      }
    };
    fetchData();
  }, [id]);

  // update value of input fields
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // submit data
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = null;

    // handle editing of customer data
    if (id) {
      response = await axios.put(`http://127.0.0.1:5000/customers/${id}`, {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
      });
      console.log("Updated Customer:");

      // update modal modalMessage
      setModalTitle("Success!");
      setModalMessage("Successfully Updated User!");

    // handle adding new customer
    } else {
      response = await axios.post(`http://127.0.0.1:5000/customers`, {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
      });
      console.log("Added Customer:");
      
      // update modal modalMessage
      setModalTitle("Success!");
      setModalMessage("Successfully Created New User!");
    }
    console.log(response);

    // display error if creation or update was unsuccessful
    if (response.status !== 200 && response.status !== 201) {
      setModalTitle("ERROR");
      setModalMessage("Error Processing Your Request. Please Try Again.");
    }
    setShowModal(true);
  };

  return (
    <div>
      <NavBar />
      <Form className="p-4 border rounded m-4" onSubmit={handleSubmit}>
        <FloatingLabel controlId="name" label="Name">
          <Form.Control
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </FloatingLabel>
        <FloatingLabel controlId="email" label="Email">
          <Form.Control
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            placeholder="email@email.com"
          />
        </FloatingLabel>
        <FloatingLabel controlId="phone" label="Phone" className="my-3">
          <Form.Control
            type="text"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
          />
        </FloatingLabel>
        <Button type="submit" className="mt-3" variant="outline-success">
          {action}
        </Button>
      </Form>
      <ModalComponent show={showModal} title={modalTitle} message={modalMessage} close={handleClose} />
    </div>
  );
}

export default CustomerManage;
