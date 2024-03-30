import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from "../routes/root";
import Profile from "../routes/profile";
import ErrorPage from "../pages/ErrorPage";
import LandingPage from "../pages/LandingPage";
import "./styles/Typography.css";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div>
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        ) : (
          
          <LandingPage />
          
        )}
      </div>
    </Router>
  )
}

export default App;

