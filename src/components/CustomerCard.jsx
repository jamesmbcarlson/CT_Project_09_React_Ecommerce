import React from 'react';
import { Card, Button } from 'react-bootstrap';

import ButtonDelete from './ButtonDelete';

function CustomerCard(props) {
    const {customerData, refreshCallback} = props;

  return (
    <div>
        <Card className="custom-card text-start m-4 shadow" border='primary' style={{ width: '20rem' }}>
            <Card.Body>
                <Card.Title>Name: {customerData.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Customer ID: {customerData.customer_id}</Card.Subtitle>
                <Card.Text>Email: {customerData.email}</Card.Text>
                <Card.Text>Phone: {customerData.phone}</Card.Text>
                <Card.Footer className='mt-3 pb-0 d-flex justify-content-around px-5 bg-transparent'>
                    <Button variant="outline-primary" href={`/customer/edit/${customerData.customer_id}`}>Edit</Button>
                    <ButtonDelete customerData={customerData} refreshCallback={refreshCallback} />
                </Card.Footer>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CustomerCard
