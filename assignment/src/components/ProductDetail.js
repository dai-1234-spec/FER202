import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, error, loading } = useSelector((state) => state.products);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", padding: "50px" }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p style={{ textAlign: "center" }}>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", padding: "50px" }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p style={{ textAlign: "center" }}>Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", padding: "50px" }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p style={{ textAlign: "center" }}>Product not found.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", padding: "50px" }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className="card my-5"
              style={{
                backgroundColor: "#282C34",
                border: "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <img
                src={`/${product.image}`}
                className="card-img-top align-self-center mt-auto"
                alt={product.name}
              />
              <div className="card-body text-center" style={{ color: "white" }}>
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Description: {product.description}</p>
                <p className="card-text">
                  Price:{" "}
                  <span style={{ color: "white" }}>
                    {product.price}
                  </span>
                </p>
                <p className="card-text" style={{ fontSize: "1.2rem" }}>
                  Current Price: {product.currentPrice}
                </p>
                <p className="card-text" style={{ fontSize: "1.2rem" }}>
                  Discount: 20%
                </p>
                <Link
                  to="/"
                  className="btn btn-primary mt-3 me-2"
                >
                  Back Home
                </Link>
                {role === "admin" && (
                  <Link
                    to={`/products/${id}/edit`}
                    className="btn btn-danger mt-3"
                  >
                    Edit
                  </Link>
                )}
                {role === "user" && (
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;