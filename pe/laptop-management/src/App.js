import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import LaptopList from './components/LaptopList';
import LaptopDetail from './components/LaptopDetail';
import NotFound from './components/NotFound';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/laptops" element={user ? <LaptopList /> : <Navigate to="/*" />} />
          <Route path="/laptops/:id" element={user ? <LaptopDetail /> : <Navigate to="/*" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;