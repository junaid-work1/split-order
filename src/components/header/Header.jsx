import { Container, Nav, Navbar } from 'react-bootstrap'
import React from 'react'

const Header = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Nav className='me-auto'>
          <Navbar.Brand href='#'>Split Order</Navbar.Brand>
          <Nav.Link href='#' style={{ color: 'white' }}>
            Home
          </Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            Junaid : <a href='#'>Logout</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
