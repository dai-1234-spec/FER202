import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card } from 'react-bootstrap';
import Question from './QuestionData';
import Score from './Score';
import TimeCounter from './TimeCounter';
import Start from './Start';
import { useSelectedAnswer } from './SelectedAnswerContext';
import Questions from './Questions'; // Should be an array of question objects

const QuizApp = ({ timerDuration = 20 }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const { selectedAnswer, setSelectedAnswer } = useSelectedAnswer();

  const handleNextQuestion = () => {
    if (selectedAnswer === Questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer('');

    if (currentQuestion < Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizEnd(true);
    }
  };

  const handleTimeUp = () => {
    handleNextQuestion();
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <Container className="mt-5">
      {!quizStarted ? (
        <Start onStart={handleStartQuiz} />
      ) : !quizEnd ? (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title as="h2" className="text-center">Quiz App</Card.Title>
            <TimeCounter
              className="mb-5"
              currentQuestion={currentQuestion}
              onTimeUp={handleTimeUp}
              duration={timerDuration}
            />
            <Question
              questionData={Questions[currentQuestion]}
              onNextQuestion={handleNextQuestion}
            />
          </Card.Body>
        </Card>
      ) : (
        <Card className="mb-0">
          <Card.Body>
            <Score score={score} totalQuestions={Questions.length} />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default QuizApp;