import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import AvailableJobs from "./pages/AvailableJobs";
import CompletedJobs from "./pages/CompletedJobs";
import Home from "./pages/home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { useAuth } from "./contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600">
      <div className="text-white text-xl">Loading...</div>
    </div>;
  }
  
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600">
      <div className="text-white text-xl">Loading...</div>
    </div>;
  }

  return (
    <Router>
      <div>
        {user && <Navbar />}
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/available-jobs" element={
            <ProtectedRoute>
              <AvailableJobs />
            </ProtectedRoute>
          } />
          <Route path="/completed-jobs" element={
            <ProtectedRoute>
              <CompletedJobs />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
