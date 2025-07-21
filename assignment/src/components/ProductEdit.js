import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from '../store/slices/productsSlice';

const ProductEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct: product, error } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    currentPrice: "",
    image: "",
  });

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProduct({ id, product: formData })).unwrap();
      alert("Updated successfully");
      navigate(`/products/${id}`);
    } catch (error) {
      // Lỗi đã được xử lý trong slice
    }
  };

  if (error) {
    return (
      <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", padding: "50px" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <p style={{ textAlign: "center" }}>Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", padding: "50px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="my-4 text-center">Edit Product</h2>
            {error && <p className="text-danger text-center">Error: {error}</p>}
            <form>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="id" style={{ width: "120px", marginRight: "15px" }}>Product id:</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="name" style={{ width: "120px", marginRight: "15px" }}>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="description" style={{ width: "120px", marginRight: "15px" }}>Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="price" style={{ width: "120px", marginRight: "15px" }}>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="currentPrice" style={{ width: "120px", marginRight: "15px" }}>Current Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id="currentPrice"
                  name="currentPrice"
                  value={formData.currentPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group d-flex align-items-center" style={{ marginBottom: "20px" }}>
                <label htmlFor="image" style={{ width: "120px", marginRight: "15px" }}>Image:</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                  style={{ padding: "10px 20px", fontWeight: "bold", borderRadius: "5px", marginRight: "10px" }}
                >
                  Save
                </button>
                <Link
                  to={`/products/${id}`}
                  className="btn btn-danger"
                  style={{ padding: "10px 20px", fontWeight: "bold", borderRadius: "5px" }}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;