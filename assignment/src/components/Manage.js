import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../store/slices/productsSlice';
import "bootstrap/dist/css/bootstrap.min.css";
import "../ProductList.css";
import { Link } from "react-router-dom";

const Manage = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteProduct(id));
      // Reset to first page if the current page becomes empty
      if (products.length <= productsPerPage && currentPage > 1) {
        setCurrentPage(1);
      }
    }
  };

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", padding: "50px" }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2 className="my-4 text-center">Manage Products</h2>
            {error && <p className="text-danger text-center">Error: {error}</p>}
            {products.length === 0 && !error && (
              <p className="text-center">No products available.</p>
            )}
            {products.length > 0 && (
              <>
                <table className="table table-striped" style={{ borderCollapse: "collapse", border: "1px solid #ddd" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <th style={{ borderRight: "1px solid #ddd" }}>#</th>
                      <th style={{ borderRight: "1px solid #ddd" }}>Name</th>
                      <th style={{ borderRight: "1px solid #ddd" }}>Description</th>
                      <th style={{ borderRight: "1px solid #ddd" }}>Price</th>
                      <th style={{ borderRight: "1px solid #ddd", whiteSpace: "nowrap" }}>Current Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product, index) => (
                      <tr key={product.id} style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ borderRight: "1px solid #ddd" }}>{indexOfFirstProduct + index + 1}</td>
                        <td style={{ borderRight: "1px solid #ddd" }}>{product.name}</td>
                        <td style={{ borderRight: "1px solid #ddd" }}>{product.description}</td>
                        <td style={{ borderRight: "1px solid #ddd", textDecoration: "line-through" }}>
                          {product.price}
                        </td>
                        <td style={{ borderRight: "1px solid #ddd" }}>{product.currentPrice}</td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ minWidth: "90px", marginBottom: "10px" }}
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </button>
                          <Link
                            to={`/products/${product.id}/edit`}
                            className="btn btn-primary btn-sm"
                            style={{ minWidth: "90px" }}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage;