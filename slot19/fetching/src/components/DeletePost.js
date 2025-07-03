import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const DeletePost = ({ onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      onDelete(id);
      setShow(false);
      navigate("/");
    } catch (error) {
      setError("Error deleting post.");
      setDeleting(false);
      console.error("Delete error:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="animate__animated animate__zoomIn"
      backdrop="static"
    >
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title className="fs-4 fw-bold text-danger">Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-4">
        <p className="fs-5 text-muted">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
        {error && (
          <Alert variant="danger" className="rounded-3" dismissible>
            {error}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          disabled={deleting}
          className="rounded-pill px-4"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-pill px-4"
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeletePost.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeletePost;