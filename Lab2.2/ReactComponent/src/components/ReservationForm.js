import { Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function ReservationForm() {
  return (
    <div className="container p-5">
      <h2 className="mb-9 text-white fw-bold"
        style={{ fontFamily: "serif", textAlign: "center" }}>Book Your Table</h2>
      <Form>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control type="text" placeholder="Your Name *" required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control type="email" placeholder="Your Email *" required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formService">
              <Form.Control as="select">
                <option>Select a Service</option>
                <option>Dine-In</option>
                <option>Takeaway</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formComment">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Please write your comment"
          />
        </Form.Group>
        <Button variant="warning" type="submit" style={{ color: "white" }}>
          Send Message
        </Button>
      </Form>
    </div>
  );
}
export default ReservationForm;
