## Project: React E-Commerce Web Application

Author: James Carlson

This project was built as an assignment for Coding Temple.

---

<br>This E-Commerce application runs in conjunction with my previous [Back-End Flask E-Commerce Project](https://github.com/jamesmbcarlson/CT_Project_05_Ecommerce_API), and was built using JavaScript, React, React Router, React Bootstrap, HTML, and CSS.

This application is a front-end interface for a database of <b>Customers</b>, <b>Products</b>, and the <b>Orders</b> of Products a Customer can place.

### <b>Customers</b>
- <em>/customers/</em> - View all customers.
- <em>/customer/:id</em> - View single customer by id.
- <em>/customer/add</em> - Add new customer.
- <em>/customer/edit/:id</em> - Edit customer with given id.
- Customers can be deleted if they are not associated with an order.

### <b>Products</b>
- <em>/products/</em> - View all products.
- <em>/product/:id</em> - View single product by id.
- <em>/product/add</em> - Add new product.
- <em>/product/edit/:id</em> - Edit product with given id.
- Products can be deleted if they are not associated with an order.

### <b>Orders</b>
- <em>/orders/</em> - View all orders.
- <em>/order/:id</em> - View single order by id.
- <em>/order/add</em> - Add new order.
    - When an Order is created, a delivery_date field is  randomly set 2 to 5 days after the order_date (no deliveries on Sundays, of course)!
    - If the delivery_date is set before the current date, the delivery is considered to be complete.
    - The total cost of all products in order is stored in order_total.
- Orders can be cancelled if they have not yet been completed.

#### <b>Known Issue:</b>
- A unique product cannot be added to an order more than once. This is an issue with the back-end Flask application that still needs to be resolved.

<br>
Thank you for reviewing my code!