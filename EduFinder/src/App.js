import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import HomePage from "./components/Home/HomePage";
import ListAllCenter from "./components/CenterList/ListAllCenter";
import SearchFilterPage from "./components/SearchFilter/SearchPage";
import CenterDetail from "./components/CenterDetail/CenterDetail";

import ProfilePage from "./components/Profile/ProfilePage";

import ComparisonPage from "./components/Comparison/ComparisonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore" element={<SearchFilterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/center-list" element={<ListAllCenter />} />
        <Route path="/center-detail" element={<CenterDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/compare" element={<ComparisonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
