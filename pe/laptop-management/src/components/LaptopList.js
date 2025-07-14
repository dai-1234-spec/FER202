import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const LaptopList = () => {
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await axios.get('http://localhost:3001/laptops');
        setLaptops(response.data);
        setFilteredLaptops(response.data);
      } catch (error) {
        console.error('Error fetching laptops:', error);
      }
    };
    fetchLaptops();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = laptops.filter(
      (laptop) =>
        laptop.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLaptops(filtered);
  };

  return (
    
    <div className="container mt-5">
      <h2>Laptop Management</h2>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by name (brand or model)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        {filteredLaptops.map((laptop) => (
          <Col md={4} key={laptop.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={laptop.image} alt={laptop.model} />
              <Card.Body>
                <Card.Title>{laptop.brand} {laptop.model}</Card.Title>
                <Card.Text>Year: {laptop.year}</Card.Text>
                <Card.Text>Price: {laptop.price}</Card.Text>
                <Link to={`/laptops/${laptop.id}`}>
                  <Button variant="info">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LaptopList;