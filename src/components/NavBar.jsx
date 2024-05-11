import React from 'react'

import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

function NavBar() {
  return (
    <div>
        <Navbar bg="primary" data-bs-theme="dark">
            <Container className='ms-6'>
                <Navbar.Brand as={Link} to='/'>LOGONAME</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to='/customers'>Customers</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar
