import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import Signup from "./pages/Signup.jsx";
import HomePage from "./pages/HomePage.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import { useAuthStore } from "./store/userAuthStore.js";
import { use } from "react";



function App() {
  
  const {authUser, checkAuth}  = useAuthStore();

  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <>
        
        <Routes>
          <Route
            path="/"
            element={
              authUser ? <HomePage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/home"
            element={ 
              authUser ? <HomePage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/jobs"
            element={
              authUser ? <JobsPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={
              !authUser ? <LoginPage /> : <Navigate to="/home" replace />
            }
          />
          <Route
            path="/signup"
            element={
              !authUser ? <Signup /> : <Navigate to="/home" replace />
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
