import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart, deleteFromCart } from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total cost
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateCart({ id, quantity }));
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p><strong>ID:</strong> {item.id}</p>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
              <p><strong>Catalogs:</strong> {item.catalogs.join(', ')}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                style={{ width: '60px', marginRight: '10px' }}
              />
              <button onClick={() => handleDelete(item.id)}>Delete from Cart</button>
            </div>
          ))}
          <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;