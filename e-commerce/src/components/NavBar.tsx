import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import { useSelector} from "react-redux";
import { RootState } from "../redux/store"; // Adjust the path to your Redux store
 import LogoutButton from "./LogoutButton";// Redux action to log out the user

const NavBar = () => {
  const user = useSelector((state: RootState) => state.user.user); // Get the user state from Redux


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">E-Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {user ? (
              <>
                <NavDropdown title="Profile" id="profile-dropdown">
                  <NavDropdown.Item as={Link} to={`/profile/${user.id}`}>Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/product/edit">Edit Product</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item > <LogoutButton /> </NavDropdown.Item>
                </NavDropdown>
                <CartButton />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <CartButton />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;