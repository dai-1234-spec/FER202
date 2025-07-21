import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/slices/cartSlice';
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  return (
    <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", padding: "50px" }}>
      <div className="container-fluid">
        <h2 className="text-center mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <table className="table table-striped" style={{ borderCollapse: "collapse", border: "1px solid #ddd" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <th style={{ borderRight: "1px solid #ddd" }}>#</th>
                    <th style={{ borderRight: "1px solid #ddd" }}>Name</th>
                    <th style={{ borderRight: "1px solid #ddd" }}>Price</th>
                    <th style={{ borderRight: "1px solid #ddd" }}>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ borderRight: "1px solid #ddd" }}>{index + 1}</td>
                      <td style={{ borderRight: "1px solid #ddd" }}>{item.name}</td>
                      <td style={{ borderRight: "1px solid #ddd" }}>{item.currentPrice}</td>
                      <td style={{ borderRight: "1px solid #ddd" }}>{item.quantity}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-4">
                <Link to="/" className="btn btn-primary">Continue Shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;