// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import  HomePage  from "./pages/HomePage";
import MainContent from "./pages/MainContent";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/userAuthStore.js";
import { useEffect } from "react";
import UpcomingJobs from "./pages/MyJobsPage";
import ProfilePage from "./pages/ProfilePage";
 



function App() {

   const {authUser, checkAuth}  = useAuthStore();

  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); 

  return (
    <Router>
      <Routes>
        {/* All routes wrapped inside HomePage */}
        <Route
          path="/"
          element={ authUser ?
            <HomePage>
              <MainContent />
            </HomePage> : <LoginPage />
          }
        />
          <Route
          path="/login"
          element={ ! authUser ? 
           <LoginPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/jobs"
          element={ authUser ?
            <HomePage>
              <JobsPage />
            </HomePage> : <LoginPage />
          }
        />
        <Route
          path="/profile"
          element={
            <HomePage>
              <ProfilePage />
            </HomePage>
          }
        />
        <Route
          path="/my-jobs"
          element={
            <HomePage>
              <UpcomingJobs />
            </HomePage>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
