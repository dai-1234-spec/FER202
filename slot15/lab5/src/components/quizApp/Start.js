import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'

const Start = ({ onStart }) => {
  const [quizStarted, setQuizStarted] = useState(false)

  const handleStartClick = () => {
    setQuizStarted(true)
    onStart()
  }

  return (
    <Card className='text-center'>
      <Card.Body>
        <Card.Title as="h2">Welcome to the Quiz App</Card.Title>
        <Card.Text>You can press the button below to start this quiz</Card.Text>
        <Button variant="primary" onClick={handleStartClick} disabled={quizStarted}>
          Start
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Start