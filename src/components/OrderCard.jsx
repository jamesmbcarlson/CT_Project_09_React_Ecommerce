import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import ButtonCancelOrder from './ButtonCancelOrder';

function OrderCard(props) {
    const {orderData, refreshCallback, dateToday} = props;

    let textColor = "text-dark";
    if(orderData.order_cancelled) {
        textColor = "text-secondary";
    }
    let subtitleClass = `${textColor} mb-2`

  return (
    <div>
        <Card className="custom-card text-start m-4 shadow" border='success' style={{ width: '24rem' }}>
            <Card.Body className={textColor}>
                <Card.Title>Order ID: {orderData.order_id}</Card.Title>
                {orderData.order_cancelled && 
                    <Card.Subtitle className='mb-2 text-danger'>ORDER CANCELLED</Card.Subtitle>
                }
                <Card.Subtitle className='mb-2'>Customer: {orderData.customer_name} (ID: {orderData.customer_id})</Card.Subtitle>
                <Card.Text>Order Date: {orderData.order_date}</Card.Text>
                {/* if order has been cancelled, no need to show estimated delivery date or order complete */}
                {orderData.order_cancelled ?
                <></>
                :
                /* consider delivery complete if current date has surpassed delivery date */
                // order complete
                dateToday > orderData.delivery_date ?
                <>
                    <Card.Text>Delivery Date: {orderData.delivery_date}</Card.Text>
                    <Card.Text>Delivery Complete: <Form.Check checked={true} disabled={true} style={{display:"inline"}}/> </Card.Text>
                </>
                :
                // order not yet delivered
                <>
                    <Card.Text>Estimated Delivery Date: {orderData.delivery_date}</Card.Text>
                    <Card.Text>Delivery Complete: <Form.Check checked={false} disabled={true} style={{display:"inline"}}/> </Card.Text>
                </> 
                }
                <Card.Text>Order:</Card.Text>
                <ul>
                    {orderData.products.map((product, index) => (
                        <li key={index}>{product.name}
                            <ul>
                                <li>${product.price.toFixed(2)}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
                <Card.Text>Order Total: ${orderData.order_total.toFixed(2)}</Card.Text>
                <Card.Footer className='mt-3 pb-0 d-flex justify-content-end px-5 bg-transparent'>
                    <ButtonCancelOrder orderData={orderData} refreshCallback={refreshCallback} buttonText="Cancel Order" />
                </Card.Footer>
            </Card.Body>
        </Card>
    </div>
  )
}

export default OrderCard
