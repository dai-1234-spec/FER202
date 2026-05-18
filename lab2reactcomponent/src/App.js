import React from "react";
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button, Card, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
const App = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand href="#">Pizza House</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="me-2" />
            <Button variant="danger" type="submit">
              <i class="bi bi-search"></i>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      {/* Carousel */}
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="../pizza1.jpg" alt="Neapolitan Pizza" />
          <Carousel.Caption>
            <h3>Neapolitan Pizza</h3>
            <p>If you are looking for traditional Italian pizza, the Neapolitan is the best option!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="../pizza2.jpg" alt="Neapolitan Pizza" />
          <Carousel.Caption>
            <h3>Neapolitan Pizza</h3>
            <p>If you are looking for traditional Italian pizza, the Neapolitan is the best option!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="../pizza3.jpg" alt="Neapolitan Pizza" />
          <Carousel.Caption>
            <h3>Neapolitan Pizza</h3>
            <p>If you are looking for traditional Italian pizza, the Neapolitan is the best option!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Our Menu */}
      <Container className="py-5 menu-section">
        <h2 className="text-white">Our Menu</h2>
        <Row>
          {menuItems.map((item, index) => (
            <Col key={index} md={3} sm={6} className="mb-4">
              <Card className="menu-card">
                {item.label && <span className="badge badge-warning">{item.label}</span>}
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title className="card-title">{item.name}</Card.Title>
                  <Card.Text className="card-title2">
                    <span className="text-muted text-decoration-line-through">{item.oldPrice}</span> {item.price}
                  </Card.Text>
                  <Button variant="dark" className="buy-button">Buy</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Book Table Form */}
      <Container className="py-5 text-white">
        <h2 className="text-center">Book Your Table</h2>
        <Form className="booking-form">
          <Row>
            <Col md={4}><FormControl type="text" placeholder="Your Name *" required /></Col>
            <Col md={4}><FormControl type="email" placeholder="Your Email *" required /></Col>
            <Col md={4}><Form.Select><option>Select a Service</option></Form.Select></Col>
          </Row>
          <FormControl as="textarea" placeholder="Please write your comment" rows={4} className="mt-3" />
          <Button variant="warning" className="mt-3">Send Message</Button>
        </Form>
      </Container>
    </>
  );
};

const menuItems = [
  { name: "Margherita Pizza", image: "../menu1.jpg", oldPrice: "$40.00", price: "$24.00", label: "SALE" },
  { name: "Mushroom Pizza", image: "../menu2.jpg", price: "$25.00" },
  { name: "Hawaiian Pizza", image: "../menu3.jpg", price: "$10.00", label: "NEW" },
  { name: "Pesto Pizza", image: "../menu4.jpg", oldPrice: "$10.00", price: "$6.00", label: "SALE" },
];

export default App;