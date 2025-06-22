import React, { createContext, useContext, useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { quizData } from "./QuizData";
import QuestionInput from "./QuestionInput";
import Question from "./Question";

// Tạo Context để chia sẻ selectedOption và feedback
const QuizContext = createContext();

function QuizApp() {
  // Quản lý danh sách câu hỏi
  const [questions, setQuestions] = useState(quizData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState(null); // null, "correct", "incorrect"
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // useEffect để log khi danh sách câu hỏi thay đổi
  useEffect(() => {
    console.log("Questions updated:", questions);
  }, [questions]);

  // Thêm câu hỏi mới
 const handleAddQuestion = (newQuestion) => {
  const newId = questions.length > 0
    ? Math.max(...questions.map(q => q.id)) + 1
    : 1;

  const questionWithId = { ...newQuestion, id: newId };
  setQuestions([...questions, questionWithId]);
};


  // Chọn phương án
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFeedback(null);
  };

  // Nộp câu trả lời
  const handleSubmit = () => {
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    setFeedback(isCorrect ? "correct" : "incorrect");
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  // Chuyển câu tiếp theo
  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
      setFeedback(null);
    } else {
      setIsQuizCompleted(true);
    }
  };

  // Bắt đầu lại quiz
  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedOption("");
    setFeedback(null);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <QuizContext.Provider value={{ selectedOption, feedback }}>
      <Container className="mt-4">
        <h1 className="text-center mb-4">Quiz Application</h1>
        {!isQuizCompleted ? (
          <>
            <QuestionInput onAddQuestion={handleAddQuestion} />
            {questions.length > 0 ? (
              <>
                <Question
                  id={questions[currentQuestion].id}
                  question={questions[currentQuestion].question}
                  options={questions[currentQuestion].answers}
                  selectedOption={selectedOption}
                  feedback={feedback}
                  onOptionSelect={handleOptionSelect}
                  onSubmit={handleSubmit}
                />
                {feedback && (
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
                  </Button>
                )}
              </>
            ) : (
              <p>No questions available. Please add a question.</p>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2>Your Score: {score} / {questions.length}</h2>
            <Button variant="primary" onClick={handleReset}>
              Reset Quiz
            </Button>
          </div>
        )}
      </Container>
    </QuizContext.Provider>
  );
}

// Hook tùy chỉnh để truy cập QuizContext
export const useQuizContext = () => useContext(QuizContext);

export default QuizApp;