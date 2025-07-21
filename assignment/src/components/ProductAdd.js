import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/slices/productsSlice';

const ProductAdd = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.products);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    currentPrice: "",
    image: "",
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(addProduct(newProduct)).unwrap();
      setSuccess(true);
      setNewProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        currentPrice: "",
        image: "",
      });
    } catch (error) {
      // Lỗi đã được xử lý trong slice
    }
  };

  return (
    <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", padding: "50px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="my-4 text-center">Add Product</h2>
            {error && <p className="text-danger text-center">Error: {error}</p>}
            {success && (
              <p className="text-center">
                Product added successfully!
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="id" style={{ width: "100px", marginRight: "10px" }}>Product id:</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  value={newProduct.id}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="name" style={{ width: "100px", marginRight: "10px" }}>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="description" style={{ width: "100px", marginRight: "10px" }}>Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="price" style={{ width: "100px", marginRight: "10px" }}>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="currentPrice" style={{ width: "100px", marginRight: "10px" }}>Current Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id="currentPrice"
                  name="currentPrice"
                  value={newProduct.currentPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="image" style={{ width: "100px", marginRight: "10px" }}>Image:</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;