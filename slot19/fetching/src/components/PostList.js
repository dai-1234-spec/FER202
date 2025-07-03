import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Spinner, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const PostList = ({ onDelete }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching posts.");
        setLoading(false);
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleShowModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${deleteId}`);
      setData(data.filter((post) => post.id !== deleteId));
      onDelete(deleteId);
      setShowModal(false);
      setDeleteId(null);
    } catch (error) {
      setError("Error deleting post.");
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" size="lg" />
        <div className="mt-3 fs-5 text-muted text-shadow">Loading posts...</div>
      </Container>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Container className="my-5 text-center">
        <Card className="card-glass shadow-lg border-0 rounded-4 p-5 animate__animated animate__fadeIn">
          <Card.Title className="fs-3 fw-bold text-primary text-shadow">
            No Posts Available
          </Card.Title>
          <Card.Text className="fs-5 text-muted mb-4">
            Create a new post to get started!
          </Card.Text>
          <Button
            as={Link}
            to="/create"
            variant="primary"
            className="rounded-pill px-5 py-2 fw-bold shadow-sm btn-gradient"
          >
            Create Post
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="text-end mb-4">
        <Button
          as={Link}
          to="/create"
          variant="primary"
          className="rounded-pill px-4 py-2 fw-bold shadow-sm btn-gradient"
        >
          Create Post
        </Button>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {data.map((post, index) => (
          <Col key={post.id}>
            <Card
              className="h-100 card-glass shadow-sm border-0 rounded-4 post-card animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card.Body className="d-flex flex-column p-4">
                <Card.Title className="fs-4 fw-bold text-primary text-shadow">
                  {post.title}
                </Card.Title>
                <Card.Text className="flex-grow-1 text-muted fs-5">
                  {post.content.length > 120
                    ? `${post.content.slice(0, 120)}...`
                    : post.content}
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between gap-3">
                  <Button
                    as={Link}
                    to={`/edit/${post.id}`}
                    variant="outline-primary"
                    className="rounded-pill flex-grow-1 bg-glass"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleShowModal(post.id)}
                    className="rounded-pill flex-grow-1 bg-glass"
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        className="modal-glass animate__animated animate__zoomIn"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-0 pb-2 bg-transparent">
          <Modal.Title className="fs-4 fw-bold text-danger text-shadow">
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <p className="fs-5 text-muted">
            Are you sure you want to delete this post? This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 bg-transparent">
          <Button
            variant="outline-secondary"
            onClick={handleCloseModal}
            className="rounded-pill px-4 bg-glass"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            className="rounded-pill px-4 btn-gradient-danger"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {error && (
        <Alert
          variant="danger"
          className="mt-4 rounded-3 bg-glass animate__animated animate__bounceIn"
          dismissible
        >
          {error}
        </Alert>
      )}
    </Container>
  );
};

PostList.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default PostList;