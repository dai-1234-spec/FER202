import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function FormFullValidation() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const newErrors = {};

    if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (!gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!country) {
      newErrors.country = "Please select a country.";
    }

    if (!agree) {
      newErrors.agree = "You must agree to the terms and conditions.";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [name, gender, country, agree]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <div>
          {["Male", "Female", "Other"].map((g) => (
            <Form.Check
              inline
              label={g}
              type="radio"
              name="gender"
              key={g}
              value={g}
              checked={gender === g}
              onChange={(e) => setGender(e.target.value)}
              isInvalid={!!errors.gender}
            />
          ))}
        </div>
        {errors.gender && (
          <div className="text-danger" style={{ fontSize: "0.875em" }}>
            {errors.gender}
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          isInvalid={!!errors.country}
        >
          <option value="">-- Select country --</option>
          <option>Hà Nội</option>
          <option>Đà Nẵng</option>
          <option>TP.HCM</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.country}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAgree">
        <Form.Check
          type="checkbox"
          label="I agree to the terms and conditions"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          isInvalid={!!errors.agree}
        />
        {errors.agree && (
          <div className="text-danger" style={{ fontSize: "0.875em" }}>
            {errors.agree}
          </div>
        )}
      </Form.Group>

      <Button type="submit" disabled={!isFormValid}>
        Submit
      </Button>
    </Form>
  );
}

export default FormFullValidation;
