import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Container className="content">
        <section id="about" className="text-center">
          <h2>About</h2>
          <p>This is the about section of the website.</p>
        </section>
        <section id="contact" className="text-center mt-4">
          <h2>Contact</h2>
          <p>For any inquiries, please contact us at example@example.com.</p>
        </section>
      </Container>
      <Footer />
    </div>
  );
};

export default App;