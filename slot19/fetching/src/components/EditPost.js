import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col, Card, FloatingLabel } from "react-bootstrap";
import PropTypes from "prop-types";

const EditPost = ({ onUpdate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        setError("Error fetching post.");
        console.error("Fetch error:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required!");
      return;
    }
    const updatedPost = { title, content };
    try {
      const response = await axios.put(`http://localhost:3000/posts/${id}`, updatedPost);
      setStatus("Post updated successfully!");
      onUpdate(response.data);
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setError("Error updating post.");
      console.error("Update error:", error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="card-glass shadow-lg border-0 rounded-4 animate__animated animate__fadeIn">
            <Card.Body className="p-5">
              <Card.Title className="text-center mb-5 fs-2 fw-bold text-primary text-shadow">
                Edit Post
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
                <FloatingLabel controlId="formContent" label="Content" className="mb-4">
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
                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-5 py-2 rounded-pill fw-bold shadow-sm btn-gradient"
                  >
                    Update Post
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

EditPost.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default EditPost;