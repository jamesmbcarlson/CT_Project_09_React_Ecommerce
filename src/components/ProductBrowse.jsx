import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import NavBar from './NavBar'
import ProductCard from './ProductCard';
import ModalComponent from './ModalComponent';

function ProductBrowse() {

  const [productData, setProductData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [productList, setProductList] = useState(null);
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
    setModalMessage("Are you sure you want to delete this product?");
    setModalNeedsConfirmation(true);
    setModalConfirmCallback(() => () => deleteProduct(idToDelete));
    setModalConfirmText("Delete");
    setModalCloseText("Cancel");
    setShowModal(true);
  }

  // delete product with given ID
  const deleteProduct = async (idToDelete) => {
    console.log("DEBUG: deleteProduct called")

    const response = await axios.delete(`http://127.0.0.1:5000/products/${idToDelete}`);
    
    setShowModal(false);
    setModalNeedsConfirmation(false);
    setModalConfirmCallback(null);
    setModalConfirmText("Confirm");
    setModalCloseText("Close");

    if(response.status === 200) {
      setModalTitle('Success');
      setModalMessage(`Product with ID: ${idToDelete} has successfully been deleted.`)
      setProductData({ name: "", email: "", phone: "" });
    } else {
      setModalTitle('ERROR');
      setModalMessage('Something went wrong!');
    }
      setShowModal(true);
  }

  // fetch product data to read
  const {id} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      // fetch data for single product 
      if(id) {
        const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
        console.log(response.data);
        if(Object.keys(response.data).length === 0) {
          setModalTitle('WARNING');
          setModalMessage(`No product found with ID: ${id}`)
          setShowModal(true);
        } else {
          setProductData(response.data);
        }
      }
      // fetch data for all products
      else {
        const response = await axios.get('http://127.0.0.1:5000/products');
        console.log(response.data);
        setProductList(response.data);
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
        {productList ? 
        // display all products
        <div>
          <h1>Products</h1> 
            <div className='btn-add'>
              <Button href='/product/add'>Add Product</Button>
            </div>
            {productList.map(product => (
              <ProductCard key={product.product_id} productData={product} refreshCallback={refresh}/>
            ))}

            </div>
          :
          // post-deletion message
          (showAfterDeletion) ?
          <h1>Product has been deleted.</h1>
          :
          // no user to display
          (productData.product_id === undefined) ?
          <h1>No Product Found with ID: {id}</h1> 
          :
          // display only one product by ID
          <div>
            <h1>Product: {productData.name} (ID: {productData.product_id})</h1>
            <ProductCard productData={productData} refreshCallback={updateDisplayAfterDeletion}/>
          </div>
          }
        </div>
      <ModalComponent show={showModal} title={modalTitle} message={modalMessage} close={handleClose}
              isConfirmation ={modalNeedsConfirmation} 
              confirmCallback ={modalConfirmCallback}
              confirmButtonText = {modalConfirmText}
              closeButtonText = {modalCloseText} />
    </div>
  )
}

export default ProductBrowse
