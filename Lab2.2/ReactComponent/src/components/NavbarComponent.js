
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

const NavbarComponents = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand
          href="#"
          className="fw-bold fs-3"
          style={{ fontFamily: "serif" }}
        >
          Pizza House
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto ms-3" style={{ fontFamily: "serif" }}>
            <Nav.Link href="#" active className="fw-bold">
              Home
            </Nav.Link>
            <Nav.Link href="#" className="fw-bold">
              About Us
            </Nav.Link>
            <Nav.Link href="#" className="fw-bold">
              Contact
            </Nav.Link>
          </Nav>
          <Form className="d-flex" role="search">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="me-2"
            />
            <Button variant="danger" type="submit">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComponents;
