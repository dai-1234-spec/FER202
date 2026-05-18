import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

function App() {
  return (
    <>
      <div className="container-fluid bg-dark text-white">
        <div className="row">
          <div className="col-lg-12">
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container">
                  <a className="navbar-brand" href="#">
                    Pizza House
                  </a>
                  <button
                    className="navbar-toggler"type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item active">
                        <a className="nav-link" href="#">
                          Home
                        </a>
                      </li>
                      <li className="nav-item active">
                        <a className="nav-link" href="#">
                          About us
                        </a>
                      </li>
                      <li className="nav-item active">
                        <a className="nav-link" href="#">
                          Contact
                        </a>
                      </li>
                    </ul>
                    <form className="d-flex" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button className="btn btn-danger" type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="col-lg-12 mb-5">
            <div className="row">
              <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="../pizza1.jpg"
                      className="d-block w-100"
                      alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Neapolitan Pizza</h5>
                      <p>
                        If you are looking for a traditional Italian pizza, the Neapolitan is the best option!
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="../pizza2.jpg"
                      className="d-block w-100"
                      alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Neapolitan Pizza</h5>
                      <p>
                        If you are looking for a traditional Italian pizza, the Neapolitan is the best option!
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="../pizza3.jpg"
                      className="d-block w-100"
                      alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Neapolitan Pizza</h5>
                      <p>
                        If you are looking for a traditional Italian pizza, the Neapolitan is the best option!
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mb-5">
            <div className="container">
              <div className='row'>
                <h2>Our Menu</h2>
              <div className='col-md-3'>
                <div className="card">
                  <div
                      className="position-absolute top-0 start-0 bg-warning text-dark px-2 py-1"style={{ fontWeight: "bold", fontSize: "12px", width: "100px", textAlign: "center" }}>Sale
                  </div>
                    <img src="../menu1.jpg" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Margherita Pizza</h5>
    <p >
        <span className="text-muted text-decoration-line-through me-2" style={{ float: "left" }}>$40.00</span>
        <span className="text-warning fw-bold" style={{ float: "left" }}>$24.00</span>
     </p>
    <a href="#" className="form-control btn btn-dark">Buy</a>
  </div>
</div>
              </div>
              <div className='col-md-3'>
                <div className="card">
  <img src="../menu2.jpg" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Mushroomushroom Pizza</h5>
    <p >
        <span className="text-muted " style={{ float: "left" }}>$25.00</span>
     </p>
    <a href="#" className="form-control btn btn-dark">Buy</a>
  </div>
</div>
              </div>
              <div className='col-md-3'>
                <div className="card">
                  <div
                      className="position-absolute top-0 start-0 bg-warning text-dark px-2 py-1"style={{ fontWeight: "bold", fontSize: "12px", width: "100px", textAlign: "center" }}>New
                  </div>
  <img src="../menu3.jpg" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Margherita Pizza</h5>
    <p >
        <span className="text-muted" style={{ float: "left" }}>$30.00</span>
     </p>
    <a href="#" className="form-control btn btn-dark">Buy</a>
  </div>
</div>
              </div>
              <div className='col-md-3'>
                <div className="card">
                  <div
                      className="position-absolute top-0 start-0 bg-warning text-dark px-2 py-1"style={{ fontWeight: "bold", fontSize: "12px", width: "100px", textAlign: "center" }}>Sale
                  </div>
  <img src="../menu4.jpg" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Margherita Pizza</h5>
    <p >
        <span className="text-muted text-decoration-line-through me-2" style={{ float: "left" }}>$50.00</span>
        <span className="text-warning fw-bold" style={{ float: "left" }}>$30.00</span>
     </p>
    <a href="#" className="form-control btn btn-dark">Buy</a>
  </div>
</div>
              </div>
              
              </div>
            </div>
            </div>  
            <div className="col-lg-12">
            <div className="container">
              <div className='row'>
                <h2 className='text-center'>Book your table</h2>
                <div class="row mb-3">
  <div className="col">
    <input type="text" className="form-control" placeholder="Your Name*" aria-label="Your Name*"/>
  </div>
  <div className="col">
    <input type="text" className="form-control" placeholder="Your Email*" aria-label="Your Email*"/>
  </div>
  <div className="col">
      <select id="inputState" class="form-select">
      <option selected>Select a Service</option>
      <option>...</option>
    </select>
  </div>
</div>
<div className='row mb-3'>
   <div className="col">
    <textarea class="form-control" rows="5" placeholder="Please write your comment" aria-label="Please write your comment"></textarea>
   </div>
</div>
<div className='row'>
   <div className="col">
    <input type='submit' className='btn btn-warning' value="Send message" ></input>
   </div>
</div>
                </div>
              </div>
              </div>
        </div>
      </div>
    </>
  );
}

export default App;
