import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/login">
          <Button variant="primary">Go to Login</Button>
        </Link>
      </Alert>
    </Container>
  );
};

export default NotFound;