import React, { useState } from 'react'
import { SelectedAnswerProvider } from './quizApp/SelectedAnswerContext'
import QuizApp from './quizApp/QuizApp'

const Quiz = () => {
  return (
    <SelectedAnswerProvider>
      <QuizApp timerDuration={15} />
    </SelectedAnswerProvider>
  )
}

export default Quiz