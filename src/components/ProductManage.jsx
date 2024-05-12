import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, FloatingLabel, Button } from "react-bootstrap";

import NavBar from "./NavBar";
import ButtonDeleteProduct from "./ButtonDeleteProduct";
import ModalComponent from "./ModalComponent";

// ProductManage is used to add new products and edit existing products
function ProductManage() {
  // hook for incoming/outgoing product data
  const [productData, setProductData] = useState({
    name: "",
    price: ""
  });
  const [action, setAction] = useState("Add Product");
  const navigate = useNavigate();

  // modal hooks
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalColorHeaderBg, setModalColorHeaderBg] = useState("bg-primary");
  const [modalColorHeaderTxt, setModalColorHeaderTxt] = useState("text-light");

  // close modal
  const handleClose = () => setShowModal(false);

  // id passed through URI
  const { id } = useParams();

  // fetch product data for editing
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
      console.log(response);

      // check for valid data; warn user if not found; set to product data if found
      if (response.data.product_id == undefined) {
        setModalTitle("Warning");
        setModalMessage(`No product found with ID: ${id}`);
        setModalColorHeaderBg("bg-warning");
        setModalColorHeaderTxt("text-dark");
        setShowModal(true);
      } else {
        setProductData(response.data);
        setAction("Update Product");
      }
    };
    fetchData();
  }, [id]);

  // update value of input fields
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // return to product page after deletion 
  const returnToProducts = () => {
    navigate ('/products');
  }

  // submit data
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = null;

    // handle editing of product data
    if (id) {
      response = await axios.put(`http://127.0.0.1:5000/products/${id}`, {
        name: productData.name,
        price: productData.price
      });
      console.log("Updated Product:");

      // update modal modalMessage
      setModalTitle("Success");
      setModalMessage("Successfully Updated Product!");
      setModalColorHeaderBg("bg-success");
      setModalColorHeaderTxt("text-light");

    // handle adding new product
    } else {
      response = await axios.post(`http://127.0.0.1:5000/products`, {
        name: productData.name,
        price: productData.price
      });
      console.log("Added Product:");
      
      // update modal modalMessage
      setModalTitle("Success");
      setModalMessage("Successfully Added New Product!");
      setModalColorHeaderBg("bg-success");
      setModalColorHeaderTxt("text-light");
    }
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
      <div className="page-content">
        {action === "Update Product" ?
        <h1>Edit Product</h1> :
        <h1>{action}</h1>}
        <div className="form-content">
          <Form className="border rounded m-4 p-4" onSubmit={handleSubmit}>
            <FloatingLabel controlId="name" label="Name">
              <Form.Control
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </FloatingLabel>
            <FloatingLabel controlId="price" label="Price" className="my-3">
              <Form.Control
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="email@email.com"
              />
            </FloatingLabel>
            <div className="d-flex justify-content-between mt-4">
              <Button type="submit" variant="primary">
                {action}
              </Button>
              {id && <ButtonDeleteProduct productData={productData} refreshCallback={returnToProducts} buttonText={"Delete Product"} />}
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

export default ProductManage;
