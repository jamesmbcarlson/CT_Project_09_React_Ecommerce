import React from 'react';
import { Card, Button } from 'react-bootstrap';

import ButtonDeleteProduct from './ButtonDeleteProduct';

function ProductCard(props) {
    const {productData, refreshCallback} = props;

  return (
    <div>
        <Card className="custom-card m-4 text-start shadow" border='info' style={{ width: '22rem' }}>
            <Card.Body>
                <Card.Title>Name: {productData.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Product ID: {productData.product_id}</Card.Subtitle>
                <Card.Text>Price: ${productData.price.toFixed(2)}</Card.Text>
                <Card.Footer className='mt-3 pb-0 d-flex justify-content-around px-5 bg-transparent'>
                    <Button variant="outline-primary" href={`/product/edit/${productData.product_id}`}>Edit</Button>
                    <ButtonDeleteProduct productData={productData} refreshCallback={refreshCallback} />
                </Card.Footer>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ProductCard
