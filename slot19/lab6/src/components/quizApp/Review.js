import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";

const QuizReview = ({ onRetakeQuiz }) => {
  const questions = useSelector((state) => state.quiz.questions);
  const selectedAnswers = useSelector((state) => state.quiz.userAnswers);
  const correctAnswers = useSelector((state) => state.quiz.correctAnswers);

  return (
  <>
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>Quiz Review</h1>
    </header>
    </div>

    <Container className="my-4">
      <Row>
        <Col>
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[question.id];
            const isCorrect = userAnswer === correctAnswers[question.id];
            const isAnswered = userAnswer !== undefined;

            return (
              <Row
                key={question.id}
                className={`mb-3 p-3 rounded ${
                  isAnswered && isCorrect
                    ? "bg-success bg-opacity-10"
                    : "bg-danger bg-opacity-10"
                }`}
              >
                <Col>
                  <p className="mb-2">
                    <strong>{`Q${index + 1}. ${question.text}`}</strong>
                  </p>
                  <Row className="g-2">
                    {question.options.map((option, idx) => (
                      <Col key={idx} xs={12}>
                        <div className="p-2 rounded">
                          <input
                            type="radio"
                            checked={option === userAnswer}
                            readOnly
                            className="me-2"
                          />
                          <span>{option}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <p className="mt-3 text-muted bg-secondary bg-opacity-25 px-3 py-2 rounded">
                    Right answer is:{" "}
                    <strong>{correctAnswers[question.id]}</strong>
                  </p>
                </Col>
              </Row>
            );
          })}

          <div className="text-center mt-4">
            <Button variant="primary" onClick={onRetakeQuiz}>
              Back to Quiz
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  </>
);
}

export default QuizReview;