import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/slices/authSlice';
import { setSearchQuery } from './store/slices/productsSlice';
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductEdit from "./components/ProductEdit";
import Manage from "./components/Manage";
import ProductAdd from "./components/ProductAdd";
import LoginPage from "./components/LoginPage";
import Cart from "./components/Cart";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, username, role } = useSelector((state) => state.auth);
  const cartLength = useSelector((state) => state.cart.items.length); // Move useSelector here

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Navigate to="/login" replace />
      ) : (
        <>
          <nav
            className="navbar navbar-expand-lg"
            style={{
              backgroundColor: "#2C3E50",
              padding: "10px 20px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
              borderBottom: "1px solid #34495E",
            }}
          >
            <div className="container-fluid">
              <Link
                className="navbar-brand ms-5"
                to="/"
                style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "25px" }}
              >
                Product App
              </Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-lg-0">
                  {role === "admin" && (
                    <>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/manage"
                          style={{ color: "#FFFFFF", fontWeight: "bold" }}
                          onMouseOver={(e) => (e.target.style.color = "#E0E0E0")}
                          onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
                        >
                          Manage
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/add"
                          style={{ color: "#FFFFFF", fontWeight: "bold" }}
                          onMouseOver={(e) => (e.target.style.color = "#E0E0E0")}
                          onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
                        >
                          Add Product
                        </Link>
                      </li>
                    </>
                  )}
                  {role === "user" && (
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/cart"
                        style={{ color: "#FFFFFF", fontWeight: "bold" }}
                        onMouseOver={(e) => (e.target.style.color = "#E0E0E0")}
                        onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
                      >
                        Cart ({cartLength})
                      </Link>
                    </li>
                  )}
                </ul>
                <div
                  className="d-flex justify-content-center me-3"
                  style={{
                    padding: "4px",
                    backgroundColor: "#ECF0F1",
                  }}
                >
                  <input
                    type="text"
                    className="form-control me-4"
                    placeholder="Search product..."
                    onChange={handleSearch}
                    style={{ width: "300px", border: "none", background: "transparent", color: "#2C3E50" }}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <span style={{ color: "#FFFFFF", fontWeight: "bold" }} className="me-3">
                    Welcome, {username}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}

      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        {isLoggedIn && (
          <>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            {role === "admin" && (
              <>
                <Route path="/products/:id/edit" element={<ProductEdit />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/add" element={<ProductAdd />} />
              </>
            )}
            {role === "user" && (
              <Route path="/cart" element={<Cart />} />
            )}
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;