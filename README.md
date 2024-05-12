## Project: React E-Commerce Web Application

Author: James Carlson

This project was built as an assignment for Coding Temple.

---

<br>This E-Commerce application runs in conjunction with my previous [Back-End Flask E-Commerce Project](https://github.com/jamesmbcarlson/CT_Project_05_Ecommerce_API), and was built using JavaScript, React, React Router, React Bootstrap, HTML, and CSS.

This application is a front-end interface for a database of <b>Customers</b>, <b>Products</b>, and the <b>Orders</b> of Products a Customer can place.

### <b>Customers</b>
- /customers/ - View all customers.
- /customer/:id - View single customer by id.
- /customer/add - Add new customer.
- /customer/edit/:id - Edit customer with given id.
- Customers can be deleted if they are not associated with an order.

### <b>Products</b>
- /products/ - View all products.
- /product/:id - View single product by id.
- /product/add - Add new product.
- /product/edit/:id - Edit product with given id.
- Products can be deleted if they are not associated with an order.

### <b>Orders</b>
- /orders/ - View all orders.
- /order/:id - View single order by id.
- /order/add - Add new order.
    - When an Order is created, a delivery_date field is  randomly set 2 to 5 days after the order_date (no deliveries on Sundays, of course)!
    - If the delivery_date is set before the current date, the delivery is considered to be complete.
    - The total cost of all products in order is stored in order_total.
- Orders can be cancelled if they have not yet been completed.

#### <b>Known Issue:</b>
- A unique product cannot be added to an order more than once. This is an issue with the back-end Flask application that still needs to be resolved.

<br>
Thank you for reviewing my code!