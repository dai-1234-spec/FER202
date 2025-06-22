import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

function QuestionInput({ onAddQuestion }) {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && answers.every((ans) => ans.trim()) && correctAnswer) {
      onAddQuestion({
        id: Date.now(),
        question,
        answers,
        correctAnswer,
      });
      setQuestion("");
      setAnswers(["", "", ""]);
      setCorrectAnswer("");
    }
  };

  return (
    <Card className="p-3 mb-4">
      <Card.Title>Add New Question</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question"
          />
        </Form.Group>
        {answers.map((answer, index) => (
          <Form.Group className="mb-3" key={index}>
            <Form.Label>Answer {index + 1}</Form.Label>
            <Form.Control
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Enter answer ${index + 1}`}
            />
          </Form.Group>
        ))}
        <Form.Group className="mb-3">
          <Form.Label>Correct Answer</Form.Label>
          <Form.Select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          >
            <option value="">Select correct answer</option>
            {answers.map((answer, index) => (
              <option key={index} value={answer} disabled={!answer}>
                {answer || `Answer ${index + 1}`}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary">
          Add Question
        </Button>
      </Form>
    </Card>
  );
}

export default QuestionInput;