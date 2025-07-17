import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart, deleteFromCart } from '../store/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Sample product data (as per the document)
  const products = [
    {
      id: '123456',
      name: 'Example Product',
      price: 9.99,
      description: 'This is an example product.',
      catalogs: ['catalog1', 'catalog2'],
    },
    // Add more products as needed
    {
      id: '789012',
      name: 'Another Product',
      price: 19.99,
      description: 'This is another example product.',
      catalogs: ['catalog3', 'catalog4'],
    },
  ];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateCart({ id, quantity }));
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;

        return (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Catalogs:</strong> {product.catalogs.join(', ')}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            {quantity > 0 && (
              <>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => handleUpdateQuantity(product.id, parseInt(e.target.value))}
                  style={{ width: '60px', margin: '0 10px' }}
                />
                <button onClick={() => handleDelete(product.id)}>Delete from Cart</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;