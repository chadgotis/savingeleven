import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Container } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>SavingEleven</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Form inline className="ml-auto">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
            <Nav>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart px-2"></i>
                  CART
                </Nav.Link>
              </LinkContainer>

              <Nav.Link href="#features">
                <i className="fas fa-user px-2"></i>SIGN IN
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
