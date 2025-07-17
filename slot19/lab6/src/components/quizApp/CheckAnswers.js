import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardBody, CardTitle, Button } from "react-bootstrap";

const CheckAnswers = ({ answers, onRetakeQuiz }) => {
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
          <Row className="g-3 justify-content-center">
            {answers && answers.length > 0 ? (
              answers.map((answer, index) => (
                <Col key={index} xs={6} sm={4} md={2} className="mb-3">
                  <Card
                    className="h-100 border-0"
                    style={{
                      backgroundColor: answer.isAnswered ? "#d1e7dd" : "#f8d7da",
                      color: answer.isAnswered ? "#155724" : "#721c24",
                    }}
                  >
                    <Card.Body className="text-center">
                      <Card.Title tag="h6">Question No {index + 1}</Card.Title>
                      <p className={answer.isAnswered ? "text-success" : "text-danger"}>
                        {answer.isAnswered ? "Answered" : "Unanswered"}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center mt-4">No answers available to review.</p>
            )}
          </Row>

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
};

CheckAnswers.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      isAnswered: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onRetakeQuiz: PropTypes.func.isRequired,
};

export default CheckAnswers;