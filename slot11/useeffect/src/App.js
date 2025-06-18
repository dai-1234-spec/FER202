import React from "react";
import { Container } from "react-bootstrap"; // Container giúp căn chỉnh form giữa trang
import ValidatedInput from "./components/ValidatedInput"; // Import component ValidatedInput
import FormValidation from "./components/FormValidation";
import FormFullValidation from "./components/FormFullValidation";
function App() {
  return (
    <Container className="mt-5">
      <h1>Exercise 4:Xác thực Form</h1>
      <ValidatedInput />
      <h1>Exercise 5:Xác thực Email và Mật khẩu</h1>
      <FormValidation />
       <h1>Exercise 6: Form đầy đủ xác thực</h1>
      <FormFullValidation />
    </Container>
  );
}

export default App;
