import React, { useReducer } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
function formReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_AGE":
      return { ...state, age: action.value };
    default:
      return state;
  }
}

function ChangeNameAge() {
  // Khởi tạo useReducer với reducer và initial state
  const [state, dispatch] = useReducer(formReducer, { name: "", age: "" });

  // Xử lý khi người dùng thay đổi input
  const handleNameChange = (e) => {
    dispatch({ type: "SET_NAME", value: e.target.value });
  };

  const handleAgeChange = (e) => {
    dispatch({ type: "SET_AGE", value: e.target.value });
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">User Information</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.name}
                    onChange={handleNameChange}
                    placeholder="Input name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.age}
                    onChange={handleAgeChange}
                    placeholder="Input age"
                  />
                </Form.Group>
              </Form>

              <div className="mt-4">
                <h4>Name: {state.name || "Not provided"}</h4>
                <h4>Age: {state.age || "Not provided"}</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangeNameAge;