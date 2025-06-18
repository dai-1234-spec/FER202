import { useState } from "react";
import Question from "./Question";
import quizData from "./QuizData";

function QuizApp() {
  const [current, setCurrent] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionsSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === quizData[current].answer) {
      setScore(score + 1);
    }
    if (current + 1 < quizData.length) {
      setCurrent(current + 1);
      setSelectedOption('');
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setScore(0);
    setSelectedOption('');
    setIsQuizCompleted(false);
  };

  return (
    <>
      {!isQuizCompleted ? (
        <Question
          id={quizData[current].id}
          question={quizData[current].question}
          options={quizData[current].options}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionsSelect}
          onSubmit={handleSubmit}
        />
      ) : (
        <div>
          <h2>Your Score: {score}</h2>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </>
  );
}

export default QuizApp;