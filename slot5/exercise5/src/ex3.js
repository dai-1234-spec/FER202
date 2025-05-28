import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "./App.css";

function Exercise3() {
  return (
    <div>
      {/* Header */}
      <div className="custom-header text-dark">
        Let's test the grid!
      </div>

      {/* Navbar */}
      <nav className="nav my-3 mx-3">
        <a className="nav-link active text-primary" href="#">Active</a>
        <a className="nav-link" href="#">Link</a>
        <a className="nav-link" href="#">Link</a>
        <a className="nav-link disabled text-muted" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
      </nav>

      {/* Grid */}
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6 grid-box">First col</div>
          <div className="col-md-6 grid-box">Second col</div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-box">col</div>
          <div className="col-md-4 grid-box">col</div>
          <div className="col-md-4 grid-box">col</div>
        </div>
        <div className="row">
          <div className="col-md-3 grid-box">col</div>
          <div className="col-md-3 grid-box">col</div>
          <div className="col-md-3 grid-box">col</div>
          <div className="col-md-3 grid-box">col</div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        Created by ABC!
      </div>
    </div>
  );
}

export default Exercise3;