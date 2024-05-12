import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, FloatingLabel, Button} from "react-bootstrap";

import NavBar from "./NavBar";
import ModalComponent from "./ModalComponent";

// OrderManage is used to add new orders and edit existing orders
function OrderManage() {
  
  // get today's date
  const date = new Date();
  const year = date.getFullYear();
  const month = String((date.getMonth() + 1)).padStart(2,"0");
  const day = String(date.getDate()).padStart(2,"0");
  const dateToday = `${year}-${month}-${day}`;

  // hook for incoming/outgoing order data
  const [orderData, setOrderData] = useState({
    // TO DO, UPDATE THESE FIELDS
    customer_id: "",
    dateToday: "",
    products: [],
  });
  
  const [customerList, setCustomerList] = useState(null);
  const [productList, setProductList] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [numProducts, setNumProducts] = useState(1);
  let orderProductsCounter = [0];

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, '']);
    console.log("handleAddProduct accessed");
  };

  const handleProductChange = (index, productId) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = productId;
    setSelectedProducts(updatedProducts);
    console.log("handleProductChange");
  };

  // modal hooks
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalColorHeaderBg, setModalColorHeaderBg] = useState("bg-primary");
  const [modalColorHeaderTxt, setModalColorHeaderTxt] = useState("text-light");

  // fetch data for all customers
  useEffect(() => {
    const fetchData = async () => {
        const customerResponse = await axios.get('http://127.0.0.1:5000/customers');
        console.log(customerResponse.data);
        setCustomerList(customerResponse.data);
        const prodcutResponse = await axios.get('http://127.0.0.1:5000/products');
        console.log(prodcutResponse.data);
        setProductList(prodcutResponse.data);
      }

    fetchData();
  }, []);

  // close modal
  const handleClose = () => setShowModal(false);

  // update value of input fields
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // submit data
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = null;

      response = await axios.post(`http://127.0.0.1:5000/orders`, {
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
      });
      console.log("Added Order:");
      
      // update modal modalMessage
      setModalTitle("Success");
      setModalMessage("Successfully Created New User!");
      setModalColorHeaderBg("bg-success");
      setModalColorHeaderTxt("text-light");
    console.log(response);

    // display error if creation or update was unsuccessful
    if (response.status !== 200 && response.status !== 201) {
      setModalTitle("Error");
      setModalMessage("Error Processing Your Request.");
      setModalColorHeaderBg("bg-danger");
      setModalColorHeaderTxt("text-light");
    }
    setShowModal(true);
  };

  const incrementProductNum = () => {
    orderProductsCounter.push(orderProductsCounter.length);
    console.log(orderProductsCounter);
  }

  return (
    <div>
      <NavBar />
      <div className="page-content">
        <h1>Add Order</h1>
        <div className="form-content">
          <Form className="border rounded m-4 p-4 shadow" onSubmit={handleSubmit}>
            <FloatingLabel controlId="date" label="Today's Date">
              <Form.Control
                type="date"
                name="date"
                value={dateToday}
                onChange={handleChange}
                disabled={true}
              />
            </FloatingLabel>

            {/* Customer Selection */}
              {customerList &&
              <FloatingLabel controlId="floatingSelect" label="Select Customer" className="my-3">
                <Form.Select>
                  {customerList.map(customer => (
                  <option 
                    key={customer.customer_id}
                    value={customer.customer_id}>
                    {customer.customer_id} - {customer.name}
                  </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            }
            
            {/* Product Selection */}
            {selectedProducts.map((selectedProductId, index) => (           
              productList &&
              <div key={index}>
                <FloatingLabel controlId={`select-${index}`} label={`Select Product ${index + 1}`} className="my-3">
                  <Form.Select onChange={(e) => handleProductChange(index, e.target.value)}>
                    {productList.map(product => (
                    <option 
                      key={product.product_id}
                      value={product.product_id}>
                      {product.product_id} - {product.name} (${product.price.toFixed(2)})
                    </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                </div>
              ))}
              <Button onClick={handleAddProduct}>+</Button>

            <div className="d-flex justify-content-between mt-4">
              <Button type="submit" variant="primary">
                Add Order
              </Button>
            </div>
          
          </Form>
        </div>
      </div>
      <ModalComponent show={showModal} 
        title={modalTitle} 
        message={modalMessage} 
        close={handleClose} 
        colorHeaderBg={modalColorHeaderBg} 
        colorHeaderTxt={modalColorHeaderTxt}/>
    </div>
  );
}

export default OrderManage;
