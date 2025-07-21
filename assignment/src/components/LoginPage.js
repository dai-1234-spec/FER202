import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../store/slices/authSlice';
import "../LoginPage.css";

const LoginPage = () => {
  const [username, setLocalUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = [
    {
      username: "longdai",
      email: "longdai@gmail.com",
      password: "123456",
      role: "admin",
    },
    {
      username: "quang",
      email: "Vanquang@gmail.com",
      password: "123456",
      role: "user",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = userData.find(
      (user) =>
        user.username === username &&
        user.email === email &&
        user.password === password
    );

    if (user) {
      dispatch(login({ username: user.username, role: user.role }));
      alert("Đăng nhập thành công!");
      navigate("/");
    } else {
      setError(
        "Đăng nhập không thành công: Tên người dùng, email hoặc mật khẩu không đúng"
      );
    }
  };

  return (
    <div style={{ backgroundColor: "#282C34", minHeight: "100vh", color: "#fff", padding: "50px" }}>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card login-card">
          <div className="card-body">
            <h2 className="text-center">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setLocalUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;