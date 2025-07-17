import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Container, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Product List</h2>
      <div className="d-flex flex-wrap" style={{ marginLeft: '-0.1rem', marginRight: '-3.5rem' }}>
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex-fill ms-3 mb-3 shadow-sm"
            style={{ minWidth: '30%', transition: 'transform 0.2s', maxWidth: '30%' }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Card.Body className="p-2">
              <ListGroup variant="flush">
                <ListGroupItem className="small"><strong>ID:</strong> {product.id}</ListGroupItem>
                <ListGroupItem className="small"><strong>Name:</strong> {product.name}</ListGroupItem>
                <ListGroupItem className="small"><strong>Price:</strong> ${product.price.toFixed(2)}</ListGroupItem>
                <ListGroupItem className="small"><strong>Catalogs:</strong> {product.catalogs.join(', ')}</ListGroupItem>
                <ListGroupItem className="small"><strong>Description:</strong> {product.description}</ListGroupItem>
              </ListGroup>
              <Button variant="primary" className="mt-2 w-100" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default ProductList;