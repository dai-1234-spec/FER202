import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Col, Container, Row } from 'react-bootstrap';

import Counter from './components/Counter';
import ControlledInput from './components/ControlledInput';
import ToggleText from './components/ToggleText';
import TodoList from './components/TodoList';
import ColorSwitcher from './components/ColorSwitcher';
import SearchFilter from './components/SearchFilter';
import DragDropList from './components/DragDropList';

function App() {
  return (
    <Container>
      <Row className="bg-dark text-white mt-5 p-3">
        <Col className="text-center">
          <Counter />
        </Col>
      </Row>
      <Row className="bg-dark text-white mt-5 p-3">
        <Col className="text-center">
          <ControlledInput />
        </Col>
      </Row>
      <Row className="bg-dark text-white mt-5 p-3">
        <Col className="text-center">
          <ToggleText />
        </Col>
      </Row>
      <TodoList />
      <ColorSwitcher />
      <Row className="bg-dark text-white mt-5 p-3">
        <Col className="text-center">
          <SearchFilter />
        </Col>
      </Row>
      <DragDropList />
    </Container>
  );
}

export default App;