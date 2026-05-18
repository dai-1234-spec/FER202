import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const ColorSwitcher = () => {
  const [color, setColor] = useState('');

  return (
    <Row className="bg-dark text-white mt-5 p-3">
      <Col className="text-center">
        <select onChange={(e) => setColor(e.target.value)} style={{ marginBottom: "15px" }}>
          <option value="">Select a color</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
        </select>
        <div
          style={{
            width: "100px",
            height: "100px",
            background: color,
            margin: "0 auto",
          }}
        ></div>
      </Col>
    </Row>
  );
};

export default ColorSwitcher;