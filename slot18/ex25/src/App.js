import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { store } from './store';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductForm from './components/ProductForm';
import { Navbar, Nav, Container } from 'react-bootstrap';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand as={NavLink} to="/">Redux Thunk Cart</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/" end>
                  Products
                </Nav.Link>
                <Nav.Link as={NavLink} to="/cart">
                  Cart
                </Nav.Link>
                <Nav.Link as={NavLink} to="/add-product">
                  Add Product
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-product" element={<ProductForm />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;