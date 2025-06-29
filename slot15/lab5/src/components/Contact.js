import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    city: '',
    state: '',
    zip: '',
    terms: false,
  })

  const [validated, setValidated] = useState(false)
  const [showTermsError, setShowTermsError] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false || !formData.terms) {
      event.preventDefault();
      event.stopPropagation();
      if (!formData.terms) {
        setShowTermsError(true)
      }
    } else {
      setShowTermsError(false)
    }
    setValidated(true)
  }

  return (
    <Container className='mt-5'>
      <h2 className="my-5 text-danger">Contact</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col md="4">
            <Form.Group controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide your First name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide your Last name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className='mt-3'> 
          <Col md="6">
            <Form.Group controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group controlId="validationCustom05">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mt-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedbackType="invalid"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          {showTermsError && (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              You must agree before submitting.
            </div>
          )}
        </Form.Group>
        <Button type="submit" className="mt-3">Submit form</Button>
      </Form>
    </Container>
  )
}

export default Contact