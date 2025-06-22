import React, { useReducer, useState, useEffect } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Khởi tạo state ban đầu
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: null, // null, "correct", hoặc "incorrect"
};

// Định nghĩa hàm reducer
function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload, feedback: null };
    case "SUBMIT_ANSWER":
      const isCorrect = state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        feedback: isCorrect ? "correct" : "incorrect",
        score: isCorrect ? state.score + 1 : state.score,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        feedback: null,
        showScore: state.currentQuestion + 1 === state.questions.length,
      };
    case "RESTART_QUIZ":
      return { ...initialState };
    default:
      return state;
  }
}

function QuestionBank() {
  // Khởi tạo useReducer
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, feedback } = state;

  // Quản lý đồng hồ đếm ngược
  const [timeLeft, setTimeLeft] = useState(10);

  // Quản lý điểm cao từ localStorage
  const [highScore, setHighScore] = useState(() => {
    return localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;
  });

  // Đồng hồ đếm ngược
  useEffect(() => {
    if (!showScore && timeLeft > 0 && !feedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !feedback) {
      dispatch({ type: "SUBMIT_ANSWER" }); // Tự động nộp nếu hết giờ
    }
  }, [timeLeft, showScore, feedback]);

  // Reset đồng hồ khi chuyển câu hỏi
  useEffect(() => {
    setTimeLeft(10);
  }, [currentQuestion]);

  // Lưu điểm cao vào localStorage
  useEffect(() => {
    if (showScore && score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  }, [showScore, score, highScore]);

  // Xử lý chọn phương án
  const handleOptionSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  // Xử lý nộp câu trả lời
  const handleSubmitAnswer = () => {
    dispatch({ type: "SUBMIT_ANSWER" });
  };

  // Xử lý chuyển câu tiếp theo
  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  // Xử lý bắt đầu lại quiz
  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
    setTimeLeft(10);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <h2>
              Your Score: {score} / {questions.length}
            </h2>
            <h4>High Score: {highScore}</h4>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            {/* Tiến trình làm bài */}
            <ProgressBar
              now={((currentQuestion + 1) / questions.length) * 100}
              label={`${currentQuestion + 1}/${questions.length}`}
              className="mb-3"
            />

            {/* Đồng hồ đếm ngược */}
            <div className="text-center mb-3">
              <span style={{ color: timeLeft < 5 ? "red" : "black" }}>
                Time Left: {timeLeft}s
              </span>
            </div>

            {/* Câu hỏi */}
            <h4>
              Question {questions[currentQuestion].id}:<br />
              {questions[currentQuestion].question}
            </h4>

            {/* Phản hồi đúng/sai */}
            {feedback && (
              <Alert variant={feedback === "correct" ? "success" : "danger"} className="mt-3">
                {feedback === "correct" ? (
                  <div>
                    <FaCheckCircle className="me-2" /> Correct! 🎉
                  </div>
                ) : (
                  <div>
                    <FaTimesCircle className="me-2" /> Incorrect! The correct answer is{" "}
                    {questions[currentQuestion].answer}.
                  </div>
                )}
              </Alert>
            )}

            {/* Các phương án trả lời */}
            <div className="mt-3 d-flex flex-wrap gap-2">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option
                      ? feedback
                        ? feedback === "correct"
                          ? "success"
                          : "danger"
                        : "primary"
                      : "outline-secondary"
                  }
                  className="flex-grow-1"
                  onClick={() => handleOptionSelect(option)}
                  disabled={feedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Nút nộp hoặc tiếp theo */}
            {feedback ? (
              <Button
                variant="primary"
                className="mt-3"
                onClick={handleNextQuestion}
              >
                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            ) : (
              <Button
                variant="primary"
                className="mt-3"
                disabled={!selectedOption}
                onClick={handleSubmitAnswer}
              >
                Submit Answer
              </Button>
            )}
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;