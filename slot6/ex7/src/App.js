import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Button } from 'react-bootstrap';

const CardDemo = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <Card style={{ backgroundColor: "#0d6efd" }} className="text-center text-white custom-card">
            <Card.Img variant="top" src="mer.jpg" />
            <Card.Body>
              <Card.Text className="text-white">
                Some text inside the first card
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ backgroundColor: "#ffc107" }} className="text-center text-dark custom-card">
            <Card.Img variant="top" src="mer.jpg" />
            <Card.Body>
              <Card.Text className="text-white">
                Some text inside the first card
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ backgroundColor: "#dc3545" }} className="text-center text-white custom-card">
            <Card.Img variant="top" src="mer.jpg" />
            <Card.Body>
              <Card.Text className="text-white">
                Some text inside the first card
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CardDemo;