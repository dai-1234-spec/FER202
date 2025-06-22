import React, { useReducer } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

// Định nghĩa hàm reducer để xử lý các hành động
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  // Sử dụng useReducer để quản lý trạng thái count
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="text-center p-4">
            <Card.Body>
              <Card.Title as="h1">Counter: {state.count}</Card.Title>
              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button
                  variant="primary"
                  onClick={() => dispatch({ type: "INCREMENT" })}
                >
                  +
                </Button>
                <Button
                  variant="danger"
                  onClick={() => dispatch({ type: "DECREMENT" })}
                >
                  -
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => dispatch({ type: "RESET" })}
                >
                  Reset
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Counter;
