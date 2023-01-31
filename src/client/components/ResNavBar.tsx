import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const ResNavBar = () => {
  return (
    <Navbar className="bg-info justify-content-center">
      <Nav>
        <Nav.Link href="/" className="mx-5 text-primary">
          Home
        </Nav.Link>
        <Nav.Link href="/books" className="mx-5 text-primary">
          Book Library
        </Nav.Link>
        <Nav.Link href="/register" className="mx-5 text-primary">
          Register
        </Nav.Link>
        <Nav.Link href="/login" className="mx-5 text-primary">
          Login
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default ResNavBar;
