import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col, Card, FloatingLabel } from "react-bootstrap";
import PropTypes from "prop-types";

const CreatePost = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required!");
      return;
    }
    const newPost = { title, content };
    try {
      const response = await axios.post("http://localhost:3000/posts", newPost);
      setStatus("Post created successfully!");
      onCreate(response.data);
      setTitle("");
      setContent("");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setError("Error creating post.");
      console.error("Create error:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="card-glass shadow-lg border-0 rounded-4 animate__animated animate__fadeIn">
            <Card.Body className="p-5">
              <Card.Title className="text-center mb-5 fs-2 fw-bold text-primary text-shadow">
                Create New Post
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="formTitle" label="Title" className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-3 input-glow"
                    required
                  />
                </FloatingLabel>
                <FloatingLabel controlId="formContent" label="Content" className="mb-5">
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Enter content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="rounded-3 input-glow"
                    style={{ minHeight: "250px" }}
                    required
                  />
                </FloatingLabel>
                <div className="text-center d-flex justify-content-center gap-4">
                  <Button
                    variant="outline-light" // Changed from outline-secondary to outline-light for better contrast
                    onClick={handleBack}
                    className="px-4 py-2 rounded-pill bg-glass text-dark fw-semibold"
                    style={{ background: "linear-gradient(135deg, #e0e0e0, #f0f0f0)" }} // Soft gray gradient
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-4 py-2 rounded-pill fw-bold shadow-sm btn-gradient"
                  >
                    Create Post
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

CreatePost.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CreatePost;