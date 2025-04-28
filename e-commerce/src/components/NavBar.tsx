import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">E-Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <CartButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;