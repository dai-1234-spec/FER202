import React, { createContext, useContext, useState } from 'react'

const SelectedAnswerContext = createContext()

export const SelectedAnswerProvider = ({ children }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('')

  return (
    <SelectedAnswerContext.Provider value={{ selectedAnswer, setSelectedAnswer }}>
      {children}
    </SelectedAnswerContext.Provider>
  )
}
export const useSelectedAnswer = () => useContext(SelectedAnswerContext)