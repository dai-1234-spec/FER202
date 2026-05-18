import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const TodoList = () => {
  const [todos, setToDos] = useState([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      setToDos([...todos, input]);
      setInput('');
    }
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setToDos(newTodos);
  };

  return (
    <Row className="bg-dark text-white mt-5 p-3">
      <Col className="text-center">
        <input
          className="m-3 p-2"
          style={{ width: "400px", borderRadius: "10px" }}
          value={input}
          placeholder="Please input a task"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn btn-danger"
          style={{ width: "170px", marginLeft: "10px" }}
          onClick={handleAdd}
        >
          Add Todo
        </button>
      </Col>
      <Col className="text-center">
        <div
          className="bg-light p-3 rounded shadow"
          style={{ maxWidth: "300px", margin: "0 auto" }}
        >
          <h5 className="text-dark mb-3">Todo List</h5>
          <ul className="list-unstyled">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="d-flex justify-content-between align-items-center mb-2 p-2 bg-white rounded shadow-sm"
              >
                <span className="text-dark">{todo}</span>
                <button onClick={() => handleDelete(index)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default TodoList;