import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./components/Welcome";
import UserProfile from "./components/UserProfile";
import NameList from "./components/NameList";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StudentCard from "./components/StudentCard";

function App() {
  const userData = { name: "traltb@fe.edu.vn", age: 39 };
  const namesList = ["traltb@fe.edu.vn", "test@fe.edu.vn"];
  //Danh sach students
  const students = [
    { name: "traltb1@fe.edu.vn", age: 39, avatar: "/student1.jpg" },
    { name: "traltb2@fe.edu.vn", age: 40, avatar: "/student2.jpg" },
    { name: "traltb3@fe.edu.vn", age: 41, avatar: "/student3.jpg" },
  ];
  return (
    <>
      <Welcome name="traltb@fe.edu.vn" />
      <UserProfile user={userData} />
      <NameList names={namesList} />
      <Container>
        <h1 className="my-4 text-center">Student information</h1>
        <Row>
          {/*Duyệt qua mảng students và truyền từng đối tượng student vào Student Card*/}
          {students.map((student, index) => (
            <Col key={index} sm={12} md={4}>
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;