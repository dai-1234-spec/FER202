import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import HomePage from "./components/Home/HomePage";
import ListAllCenter from "./components/CenterList/ListAllCenter";
import SearchFilterPage from "./components/SearchFilter/SearchPage";
import CenterDetail from "./components/CenterDetail/CenterDetail";
import ChatBot from "./components/ChatBot/ChatBot";

import ProfilePage from "./components/Profile/ProfilePage";

import ComparisonPage from "./components/Comparison/ComparisonPage";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "539328221568-dskf4r571bshd4lgh2ks8vbsdjfk41js.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
        <ChatBot />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
