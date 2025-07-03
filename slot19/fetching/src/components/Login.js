import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col, Card, FloatingLabel } from "react-bootstrap";
import PropTypes from "prop-types";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user accounts from db.json
    axios.get("http://localhost:3000/useraccounts")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required!");
      return;
    }
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setStatus(`Login successfully with username: ${username}`);
      setTimeout(() => navigate("/postlist"), 1000);
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="card-glass shadow-lg border-0 rounded-4 animate__animated animate__fadeIn">
            <Card.Body className="p-5">
              <Card.Title className="text-center mb-5 fs-2 fw-bold text-primary text-shadow">
                Login
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="formUsername" label="Username" className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-3 input-glow"
                    required
                  />
                </FloatingLabel>
                <FloatingLabel controlId="formPassword" label="Password" className="mb-5">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-3 input-glow"
                    required
                  />
                </FloatingLabel>
                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-5 py-2 rounded-pill fw-bold shadow-sm btn-gradient"
                  >
                    Login
                  </Button>
                </div>
              </Form>
              {status && (
                <Alert
                  variant="success"
                  className="mt-4 rounded-3 bg-glass animate__animated animate__bounceIn"
                  dismissible
                >
                  {status}
                </Alert>
              )}
              {error && (
                <Alert
                  variant="danger"
                  className="mt-4 rounded-3 bg-glass animate__animated animate__bounceIn"
                  dismissible
                >
                  {error}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;