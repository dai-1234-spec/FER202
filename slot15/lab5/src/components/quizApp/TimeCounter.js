
import React, { useState, useEffect } from 'react'

const TimeCounter = ({ duration, currentQuestion, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1)
      } else {
        onTimeUp()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [duration, onTimeUp, timeLeft])

  useEffect(() => {
    // Reset the timer when the currentQuestion changes
    setTimeLeft(duration);
  }, [currentQuestion, duration])

  return (
    <div className='d-flex'>
      <h5>Time Left: </h5>
      <h5 className='text-danger mx-2'>{timeLeft}s</h5>
    </div>
  )
}

export default TimeCounter
