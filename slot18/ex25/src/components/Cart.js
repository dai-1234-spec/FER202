import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate total cost
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroupItem><strong>ID:</strong> {item.id}</ListGroupItem>
                  <ListGroupItem><strong>Name:</strong> {item.name}</ListGroupItem>
                  <ListGroupItem><strong>Price:</strong> ${item.price.toFixed(2)}</ListGroupItem>
                  <ListGroupItem><strong>Catalogs:</strong> {item.catalogs.join(', ')}</ListGroupItem>
                  <ListGroupItem><strong>Quantity:</strong> {item.quantity}</ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
          <h3 className="mt-4">Total Cost: ${totalCost.toFixed(2)}</h3>
        </>
      )}
    </Container>
  );
};

export default Cart;