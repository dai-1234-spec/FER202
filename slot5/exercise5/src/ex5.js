import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import groupPhoto from './img/group-photo.jpg';
import student1 from './img/student1.jpg';
import student2 from './img/student2.jpg';
import student3 from './img/student3.jpg';
import student4 from './img/student4.jpg';
import './components/Ex5.css';
function Ex5() {
  return (
    <div className="">
      {/* Header Section */}
      <header style={{ backgroundColor: '#F5D7A6', padding: '10px 0' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png" alt="FPT Education Logo" style={{ height: '50px', marginRight: '10px' }} />

            <nav className="ms-3">
              <ul className="nav" >
                <li className="nav-item" >
                  <a className="nav-link" href="/" style={{ color: 'red',textDecoration: 'none' , fontWeight: 'bold'}}>Trang chủ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/research" style={{ color: 'red' ,textDecoration: 'none', fontWeight: 'bold'}}>Nghiên cứu</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admission" style={{ color: 'red',textDecoration: 'none' , fontWeight: 'bold'}}>Tuyển sinh</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/students" style={{ color: 'red',textDecoration: 'none',  fontWeight: 'bold'}}>Sinh viên</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="input-group w-25">
            <p style={{ paddingTop: '10px' }}>Search:</p>
            <input type="text" className="form-control" placeholder="Search" style={{ height: '30px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', marginTop: '9px', marginLeft: '10px' }} />

          </div>
        </div>
      </header>

      {/* Main Section with Group Photo */}
      <main style={{ backgroundColor: '#F5A623', padding: '20px 0' ,width: '100%'}}>
        <div style={{ maxWidth: '100%', height: 'auto', textAlign:'center' }}>
          <img src={groupPhoto} alt="Group Photo" />
        </div>
      </main>

      <div className="container text" style={{ backgroundColor: 'gray', marginLeft: '50px', width: '15%', float: 'left' ,borderRadius: '5px'}}>
        <nav className="mt-3">

          <ul className="nav flex-column" style={{padding: '5px'}}>
            <div style={{ display: 'flex' ,marginBottom: '10px'}}>
              <div style={{ marginLeft: '-16px' }}>
                <li className="nav-item">
                  <a className="nav-link " href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
                </li>
              </div>
              <div style={{ marginLeft: '-30px' }}>
                <li className="nav-item">
                  <a className="nav-link " href="/" style={{ color: 'black', textDecoration: 'none' }}>/</a>
                </li>
              </div>
              <div>
                <li className="nav-item" >
                  <a className="nav-link " href="/" style={{ color: 'white', textDecoration: 'none' }}>Student</a>
                </li>
              </div>
            </div>

          </ul>
        </nav>
      </div>
      {/* Students Detail Section */}
      <section className="container my-5">
        <h2 className="text-center mb-5" style={{marginLeft: '-60px'}}>Students Detail</h2>
        <div className="row">
          {/* Student 1 */}
          <div className="col-md-6 mb-4">
            <div className="card text-center">
              <img src={student1} alt="Student 1" className="card-img-top" style={{ maxHeight: '500px' }} />
              <div className="card-body">
                <h5 className="card-title">Nguyễn Hữu Quốc Khánh</h5>
                <p className="card-text">DE160182</p>
                <div>
                  <input type="radio" name="status1" /> Absent
                  <input type="radio" name="status1" /> Present
                </div>
                <button className="btn btn-warning mt-2">Submit</button>
                <p>DaNang</p>
              </div>
            </div>
          </div>

          {/* Student 2 */}
          <div className="col-md-6 mb-4">
            <div className="card text-center">
              <img src={student2} alt="Student 2" className="card-img-top" style={{ maxHeight: '500px' }} />
              <div className="card-body">
                <h5 className="card-title">Chøy Vĩnh Thiện</h5>
                <p className="card-text">DE160377</p>
                <div>
                  <input type="radio" name="status2" /> Absent
                  <input type="radio" name="status2" /> Present
                </div>
                <button className="btn btn-warning mt-2">Submit</button>
                <p>QuangNam</p>
              </div>
            </div>
          </div>

          {/* Student 3 */}
          <div className="col-md-6 mb-4">
            <div className="card text-center">
              <img src={student3} alt="Student 3" className="card-img-top" style={{ maxHeight: '500px' }} />
              <div className="card-body">
                <h5 className="card-title">Đỗ Nguyên Phúc</h5>
                <p className="card-text">DE160547</p>
                <div>
                  <input type="radio" name="status3" /> Absent
                  <input type="radio" name="status3" /> Present
                </div>
                <button className="btn btn-warning mt-2">Submit</button>
                <p>QuangNam</p>
              </div>
            </div>
          </div>

          {/* Student 4 */}
          <div className="col-md-6 mb-4">
            <div className="card text-center">
              <img src={student4} alt="Student 4" className="card-img-top" style={{ maxHeight: '500px' }} />
              <div className="card-body">
                <h5 className="card-title">Lê Hoàng Minh</h5>
                <p className="card-text">DE170049</p>
                <div>
                  <input type="radio" name="status4" /> Absent
                  <input type="radio" name="status4" /> Present
                </div>
                <button className="btn btn-warning mt-2">Submit</button>
                <p>DaNang</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ backgroundColor: '#F5A623', padding: '10px 0', color: 'black' }}>
        <div className="container d-flex justify-content-between align-items-start flex-wrap">
          {/* Contact Information */}
          <div className="mb-3" style={{marginTop: '40px'}}>
            <p className="fw-bold">Our Address</p>
            <p>
              <i className="bi bi-geo-alt me-2"></i>
              Khu đô thị FPT Đà Nẵng
            </p>
            <p>
              <i className="bi bi-telephone me-2"></i>
              +840231311111
            </p>
            <p>
              <i className="bi bi-envelope me-2"></i>
              fptdu@fpt.edu.vn
            </p>
          </div>
          {/* Social Media Icons */}
          <div className="mb-3" style={{marginTop: '90px', marginRight: '50px'}}>
            <a href="#" className="text-black me-3" style={{textDecoration: 'none'}}>
              <i className="bi bi-google" style={{fontSize: '1.5rem',fontWeight: 'bold'}}>G+</i>
            </a>
            <a href="#" className="text-black me-3" style={{textDecoration: 'none'}}>
              <i className="bi bi-facebook" style={{fontSize: '1.5rem',color: 'blue',fontWeight: 'bold'}}>f</i>
            </a>
            <a href="#" className="text-black me-3" style={{textDecoration: 'none'}}>
              <i className="bi bi-instagram" style={{fontSize: '1.5rem',fontWeight: 'bold' ,color: 'skyblue'}}>in</i>
            </a>
            <a href="#" className="text-black me-3" style={{textDecoration: 'none'}}>
              <i className="bi bi-twitter" style={{fontSize: '1.5rem'}}>🐦</i>
            </a>
            <a href="#" className="text-black me-3" style={{textDecoration: 'none'}}>
              <i className="bi bi-youtube" style={{fontSize: '1.5rem'}}>📺</i>
            </a>
            <a href="#" className="text-black" style={{textDecoration: 'none'}}>
              <i className="bi bi-envelope" style={{fontSize: '1.5rem'}}>✉</i>
            </a>
          </div>
        </div>
        <div className="text-center">
          <p> Copyrignt 2023</p>
        </div>
      </footer>
    </div>
  );
}

export default Ex5;