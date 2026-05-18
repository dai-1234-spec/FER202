import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const DragDropList = () => {
  const [dragItems, setDragItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const [draggingItem, setDraggingItem] = useState(null);

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
    <Row className="bg-dark text-white mt-5 p-3">
      <Col className="text-center">
        <h5>Drag and Drop List</h5>
        <ul>
          {dragItems.map((item, index) => (
            <li
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {item}
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};

export default DragDropList;
