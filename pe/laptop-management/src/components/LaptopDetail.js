import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';

const LaptopDetail = () => {
  const { id } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaptop = async () => {
      console.log(`Fetching laptop with ID: ${id}`); // For debugging
      try {
        const response = await fetch(`http://localhost:3001/laptops/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Laptop not found (404)');
          } else {
            throw new Error(`Unable to fetch laptop: ${response.status}`);
          }
        }
        const data = await response.json();
        setLaptop(data);
      } catch (err) {
        console.error('Fetch error:', err.message); // For debugging
        setError(err.message);
      }
    };
    fetchLaptop();
  }, [id]);

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/laptops">
          <Button variant="primary">Back to List</Button>
        </Link>
      </div>
    );
  }

  if (!laptop) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <Card>
        < Card.Img
        variant = "top"
        src = {
            `${process.env.PUBLIC_URL}/${laptop.image}`
        }
        alt = {
            laptop.model
        }
        className="w-25 h-25"
        />
        <Card.Body>
          <Card.Title>{laptop.brand} {laptop.model}</Card.Title>
          <Card.Text>Year: {laptop.year}</Card.Text>
          <Card.Text>Price: {laptop.price}</Card.Text>
          <Card.Text>Description: {laptop.description || 'No description available.'}</Card.Text> {/* Handle if description missing */}
          <Link to="/laptops">
            <Button variant="primary">Back to List</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LaptopDetail;