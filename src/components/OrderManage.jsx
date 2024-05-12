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

  // hook for adding order data
  const [orderData, setOrderData] = useState({
    customer_id: "",
    order_date: dateToday,
    products: []
  });
  
  const [customerList, setCustomerList] = useState(null);
  const [productList, setProductList] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([1]);
  const [orderTotal, setOrderTotal] = useState(0);

  // adds another slectdown menu so more products may be added
  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, '']);
    console.log("handleAddProduct accessed");
  };

  // change value of product in product list
  const handleProductChange = (index, productId) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = productId;
    setSelectedProducts(updatedProducts);
    console.log("handleProductChange");
    console.log(updatedProducts)

    // get running total of order
    let total = 0;
    for (let product of productList) {
      if (updatedProducts.includes(String(product.product_id))) {
        total += product.price;
      }
    }
    setOrderTotal(total);
  };

  // modal hooks
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalColorHeaderBg, setModalColorHeaderBg] = useState("bg-primary");
  const [modalColorHeaderTxt, setModalColorHeaderTxt] = useState("text-light");

  // close modal
  const handleClose = () => setShowModal(false);

  // fetch data for all customers and products
  useEffect(() => {
    const fetchData = async () => {
        const customerResponse = await axios.get('http://127.0.0.1:5000/customers');
        console.log(customerResponse.data);
        setCustomerList(customerResponse.data);
        const productResponse = await axios.get('http://127.0.0.1:5000/products');
        console.log(productResponse.data);
        setProductList(productResponse.data);
      }
    fetchData();
  }, []);

  // update value of input fields
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  }

  // submit data
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = null;

      response = await axios.post(`http://127.0.0.1:5000/orders`, {
        customer_id: orderData.customer_id,
        order_date: orderData.order_date,
        products: selectedProducts
      });
      console.log("Added Order:");
      
      // update modal modalMessage
      setModalTitle("Success");
      setModalMessage("Successfully Created New Order!");
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

  return (
    <div>
      <NavBar />
      <div className='subhero-image img-orders'></div>
      <div className="page-content">
        <h1>Add Order</h1>
        <div className="form-content">
          <Form className="border rounded m-4 p-4 shadow" onSubmit={handleSubmit}>
            <FloatingLabel controlId="date" label="Today's Date">
              <Form.Control
                type="date"
                name="order_date"
                value={orderData.order_date}
                onChange={handleChange}
                // disabled={true}
              />
            </FloatingLabel>

            {/* Customer Selection */}
              {customerList &&
              <FloatingLabel controlId="floatingSelect" label="Select Customer" className="my-3">
                <Form.Select name="customer_id" onChange={handleChange}>
                  {customerList.map(customer => (
                  <option 
                    key={customer.customer_id}
                    value={customer.customer_id}
                    >
                    {customer.customer_id} - {customer.name}
                  </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            }
            
            {/* Product Selection */}
            {/* Known Issue: Cannot add more than 1 of any product. This is an issue that was never resolved in the corresponding Flask project */}
            {selectedProducts.map((selectedProductId, index) => (           
              productList &&
              <div key={index}>
                <FloatingLabel controlId={`select-${index}`} label={`Select Product ${index + 1}`} className="my-3">
                  <Form.Select onChange={(e) => handleProductChange(index, e.target.value)} style={{display:"inline"}}>
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
              <div className="d-flex justify-content-between">
                <Button onClick={handleAddProduct} style={{display:"inline"}} variant='outline-primary'>Add Another Product</Button>
                {selectedProducts.length > 1 && (
                  <Button onClick={() => handleRemoveProduct(selectedProducts.lenghth - 1)} variant="outline-danger" style={{display:"inline"}}>Remove Last Product</Button>
                )}
              </div>

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
      <div className='footer'>🛒 eCommerce</div>
    </div>
  );
}

export default OrderManage;
