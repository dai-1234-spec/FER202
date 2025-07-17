import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Home from './components/Home';
import News from './components/News';
import Quiz from './components/Quiz';
import About from './components/About';
import Contact from './components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";
import CheckAnswers from "./components/quizApp/CheckAnswers";
import Review from "./components/quizApp/Review";

function App() {
  return (
    <Router>
      <Navbar bg="light" variant="light" expand="md">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto mx-5">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link onClick={() => { window.location.href = "/quiz"; }}>Quiz</Nav.Link>
            <Nav.Link as={Link} to="/news">News</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<CheckAnswers />} />
          <Route path="/SubmitReview" element={<Review />} />
          <Route path="/news" element={<News />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;