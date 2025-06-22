import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function Question({ id, question, options, selectedOption, feedback, onOptionSelect, onSubmit }) {
  return (
    <div>
      <h2>Question {id}</h2>
      <h3>{question}</h3>
      <Form>
        {options.map((option, index) => (
          <Form.Check
            key={index}
            type="radio"
            label={option}
            value={option}
            checked={selectedOption === option}
            onChange={() => onOptionSelect(option)}
            disabled={!!feedback}
            className="mb-2"
          />
        ))}
      </Form>
      {feedback && (
        <Alert variant={feedback === "correct" ? "success" : "danger"} className="mt-3">
          {feedback === "correct" ? (
            <div>
              <FaCheckCircle className="me-2" /> Correct! 🎉
            </div>
          ) : (
            <div>
              <FaTimesCircle className="me-2" /> Incorrect!
            </div>
          )}
        </Alert>
      )}
      <Button onClick={onSubmit} disabled={!selectedOption || !!feedback} variant="primary" className="mt-3">
        Submit
      </Button>
    </div>
  );
}

export default Question;