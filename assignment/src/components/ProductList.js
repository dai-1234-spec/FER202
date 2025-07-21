import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setCurrentPage } from '../store/slices/productsSlice';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../ProductList.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const { filteredProducts, currentPage, productsPerPage, error, loading } = useSelector(
    (state) => state.products
  );
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", paddingTop: "50px" }}>
      <h2>Product List</h2>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {filteredProducts.length === 0 && !error && !loading && (
        <p style={{ textAlign: "center" }}>No products found.</p>
      )}
      {filteredProducts.length > 0 && (
        <div className="container-fluid">
          <div className="row mt-4">
            {currentProducts.map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top align-self-center mt-auto"
                    alt={product.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title" style={{ color: "red" }}>{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="text-center mt-auto" style={{ minHeight: "60px" }}>
                      <p className="card-text mb-3">
                        <span style={{ textDecoration: "line-through", color: "#666", fontSize: "17px" }}>
                          {product.price}
                        </span>
                      </p>
                      <p className="card-text mb-2" style={{ color: "red", fontSize: "19px" }}>
                        {product.currentPrice}
                      </p>
                    </div>
                    <div className="mt-3 text-center">
                      <Link
                        to={`/products/${product.id}`}
                        className="btn w-30"
                        style={{ backgroundColor: "#dc3545", color: "#fff" }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;