import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct } from '../store/cartSlice';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const ProductForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    catalogs: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      catalogs: formData.catalogs.split(',').map((cat) => cat.trim()),
    };
    dispatch(addNewProduct(product));
    setFormData({ name: '', price: '', description: '', catalogs: '' }); // Reset form
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Add New Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="catalogs">
          <Form.Label>Catalogs (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="catalogs"
            value={formData.catalogs}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;