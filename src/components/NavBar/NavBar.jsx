// NavBar.js

import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

export default function NavBar() {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            Restro - find your restaurant
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
    </div>
  );
}
