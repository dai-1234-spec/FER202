import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'

class Score extends Component {
  handleReplay = () => {
    window.location.reload()
  }

  render() {
    const { score, totalQuestions } = this.props

    return (
      // <Card className="text-center">
      //   <Card.Body>

      //   </Card.Body>
      // </Card>
      <div className='text-center'>
        <Card.Title as="h2">Congratulations on completing the quiz!</Card.Title>
        <Card.Title>Your Score: {score} / {totalQuestions}</Card.Title>
        <Button variant="warning" onClick={this.handleReplay}>Play Again</Button>
      </div>
    )
  }
}

export default Score