import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  const [isVisible, SetIsVisible] = useState(false);
  const [todos, setToDos] = useState([]);
  const [input, setInput] = useState('');
  const [color, setColor] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const items = ["fer202", "swp391", "swr302", "swt301"];
  const [dragItems, setDragItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const [draggingItem, setDraggingItem] = useState(null);
  const handleAdd=()=>{
    if(input.trim()!==''){
      setToDos([...todos,input]);
      setInput('');
    }
  };
  const handleDelete=(index)=>{
    const newTodos= todos.filter((_,i)=>i!==index);
    setToDos(newTodos);
  };
  const filteredItems = items.filter(
  (item) => item.toLowerCase().includes(searchInput.toLowerCase())
  );
  const handleDragStart = (e, index) => {
    setDraggingItem(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggingItem === null || draggingItem === dropIndex) return;
    const newItems = [...dragItems];
    const [draggedItem] = newItems.splice(draggingItem, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    setDragItems(newItems);
    setDraggingItem(null);
  };
  return (
    <>
      <Container>
        <Row className="bg-dark text-white mt-5 p-3">
          <Col className="text-center">
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <p>Count: {count}</p>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <p>Input text: {value}</p>
            <button onClick={() => SetIsVisible(!isVisible)}>
              {isVisible ? "Hide" : "Show"}
            </button>
            {isVisible && <p>Toggle me!</p>}
          </Col>
        </Row>
        <Row className="bg-dark text-white mt-5 p-3">
          <Col className="text-center">
            <input className="m-3 p-2" style={{ width: "400px", borderRadius: "10px" }} value={input} placeholder="Please input a task" onChange={(e) => setInput(e.target.value)}/>
            <button className="btn btn-danger" style={{ width: "170px", marginLeft: "10px" }} onClick={handleAdd}>Add Todo</button>
            {/* <p>{input}</p> */}
          </Col>
          <Col className="text-center">
            <div className="bg-light p-3 rounded shadow"style={{ maxWidth: "300px", margin: "0 auto" }}>
              <h5 className="text-dark mb-3">Todo List</h5>
              <ul className="list-unstyled">
                {todos.map((todo, index) => (
                  <li key={index}className="d-flex justify-content-between align-items-center mb-2 p-2 bg-white rounded shadow-sm">
                    <span className="text-dark">{todo}</span>
                    <button onClick={() => handleDelete(index)} className="btn btn-danger btn-sm">Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
        <Row className="bg-dark text-white mt-5 p-3">
          <Col className="text-center">
            <select onChange={(e) => setColor(e.target.value)} style={{ marginBottom: "15px" }} >
              <option value="">Select a color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Yellow">Yellow</option>
            </select>
            <div style={{ width: "100px", height: "100px", background: color, margin: "0 auto", }}>
            </div>
          </Col>
        </Row>
        <Row className="bg-dark text-white mt-5 p-3">
          <Col className="text-center">
            <input value={searchInput}onChange={(e) => setSearchInput(e.target.value)} placeholder="Searching..."/>
            <ul>
              {filteredItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row className="bg-dark text-white mt-5 p-3">
          <Col className="text-center">
            <h5>Drag and Drop List</h5>
            <ul>
              {dragItems.map((item, index) => (
                <li key={index} draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)}>
                  {item}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
