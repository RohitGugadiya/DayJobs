import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./pages/Profile";
import AvailableJobs from "./pages/AvailableJobs";
import CompletedJobs from "./pages/CompletedJobs";
import Home from "./pages/home";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
      

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/available-jobs" element={<AvailableJobs />} />
          <Route path="/completed-jobs" element={<CompletedJobs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
