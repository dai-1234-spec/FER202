import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

// Lazy load components
const Login = lazy(() => import("./components/Login"));
const PostList = lazy(() => import("./components/PostList"));
const CreatePost = lazy(() => import("./components/CreatePost"));
const EditPost = lazy(() => import("./components/EditPost"));
const DeletePost = lazy(() => import("./components/DeletePost"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="text-center my-5"><Spinner animation="border" variant="primary" size="lg" /> Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/postlist"
            element={<PostList onDelete={() => {}} />}
          />
          <Route
            path="/create"
            element={<CreatePost onCreate={() => {}} />}
          />
          <Route
            path="/edit/:id"
            element={<EditPost onUpdate={() => {}} />}
          />
          <Route
            path="/delete/:id"
            element={<DeletePost onDelete={() => {}} />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;