import React, { useEffect, useReducer } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useSelectedAnswer } from './SelectedAnswerContext';

const initialState = {
  localSelectedAnswer: '',
  showCorrectness: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SetLocalSelectedAnswer':
      return { ...state, localSelectedAnswer: action.payload, showCorrectness: false }
    case 'ShowCorrect':
      return { ...state, showCorrectness: true }
    case 'Reset':
      return initialState
    default:
      return state
  }
}

const Question = ({ questionData, onNextQuestion }) => {
  const { question, options, answer } = questionData
  const { setSelectedAnswer } = useSelectedAnswer()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { localSelectedAnswer, showCorrectness } = state

  useEffect(() => {
    dispatch({ type: 'Reset' })
    setSelectedAnswer('')
  }, [questionData, setSelectedAnswer])

  const handleAnswerSelect = (option) => {
    dispatch({ type: 'SetLocalSelectedAnswer', payload: option })
    setSelectedAnswer(option)
  }

  const handleNextQuestion = () => {
    if (localSelectedAnswer) {
      dispatch({ type: 'ShowCorrect' })
      if (localSelectedAnswer === answer) {
        setTimeout(() => {
          onNextQuestion()
        }, 1000) // delay để xem đáp án đúng hay sai
      } else {
        setTimeout(() => {
          onNextQuestion()
        }, 1000)
      }
    }
  }

  return (
    <Card className="mt-2">
      <Card.Body>
        <Card.Title>{question}</Card.Title>
        <ListGroup>
          {options.map((option, index) => (
            // Hiện đáp án đúng sai sau khi bấm next question
            <ListGroup.Item
              key={index}
              variant={
                showCorrectness
                  ? option === answer
                    ? 'success'
                    : option === localSelectedAnswer
                    ? 'danger'
                    : ''
                  : localSelectedAnswer === option
                  ? 'success'
                  : ''
              }
              onClick={() => handleAnswerSelect(option)}
              style={{ cursor: 'pointer' }}
            >
              {option}
              {showCorrectness && localSelectedAnswer === option && (
                <span className="ml-2">
                  {localSelectedAnswer === answer ? ' - Correct' : ' - Incorrect'}
                </span>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button className="mt-3" variant="primary" onClick={handleNextQuestion} disabled={!localSelectedAnswer}>Next Question</Button>
      </Card.Body>
    </Card>
  )
}

export default Question