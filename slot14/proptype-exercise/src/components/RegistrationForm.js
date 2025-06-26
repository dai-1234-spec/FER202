import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Alert } from "react-bootstrap";

const RegistrationForm = ({ title, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Name validation: 3-50 characters
    if (!formData.name) {
      newErrors.name = "Tên không được để trống!";
    } else if (formData.name.length < 3 || formData.name.length > 50) {
      newErrors.name = "Tên phải chứa từ 3 đến 50 ký tự!";
    }

    // Age validation: 18-100
    const age = parseInt(formData.age, 10);
    if (!formData.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else if (isNaN(age) || age < 18 || age > 100) {
      newErrors.age = "Tuổi phải là số từ 18 đến 100!";
    }

    // Email validation: basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng!";
    }

    // Phone validation: 10-15 digits
    const phoneRegex = /^\d{10,15}$/;
    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải chứa 10-15 chữ số!";
    }

    // Terms validation
    if (!formData.terms) {
      newErrors.terms = "Bạn phải đồng ý với các điều khoản!";
    }

    setErrors(newErrors);
    setShowAlert(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setShowAlert(false);
    }
  };

  return (
    <Container>
      <h3>{title}</h3>

      {showAlert && (
        <Alert variant="danger">
          <strong>Lỗi:</strong> Vui lòng kiểm tra và điền đầy đủ thông tin.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Name field */}
        <Form.Group controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Age field */}
        <Form.Group controlId="formAge">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email field */}
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Phone field */}
        <Form.Group controlId="formPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Terms checkbox */}
        <Form.Group controlId="formTerms">
          <Form.Check
            type="checkbox"
            name="terms"
            label="Tôi đồng ý với các điều khoản"
            checked={formData.terms}
            onChange={handleChange}
            isInvalid={!!errors.terms}
          />
          <Form.Control.Feedback type="invalid">
            {errors.terms}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Đăng ký
        </Button>
      </Form>
    </Container>
  );
};

RegistrationForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;