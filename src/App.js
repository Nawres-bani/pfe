import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './components/signup_component';
import Login from './components/login_component';
import Home from './components/Home';
import Dashboard from './components/dashboard_component';
import Filiale from './components/filiale_component';

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!isLoggedIn) return <Navigate to="/sign-in" />;
    if (!allowedRoles.includes(userRole)) return <Navigate to="/home" />;
    return element;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          
          {/* Page Home accessible aux utilisateurs connectés */}
          <Route path="/home" element={<ProtectedRoute element={<Home />} allowedRoles={["User", "Admin"]} />} />

          {/* Pages réservées à l'Admin */}
          <Route path="/admin" element={<ProtectedRoute element={<Home />} allowedRoles={["Admin"]} />} />
          <Route path="/filiale" element={<ProtectedRoute element={<Filiale />} allowedRoles={["Admin"]} />} />

          {/* Page accessible aux Users */}
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["User", "Admin"]} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
