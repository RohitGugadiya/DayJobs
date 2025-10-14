import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/NavBar.css"; // Ensure this path is correct

function HomeNav() {
  return (
    <nav className="app-navbar">
      <div className="navbar-brand">
        {/* Using a NavLink for the brand/logo is good practice */}
        <NavLink to="/">
            Kick on <span className="logo-dot">.</span>
        </NavLink>
      </div>
      <div className="navbar-links-group">
        <NavLink 
            to="/" 
            className={({ isActive }) => "navbar-link " + (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink 
            to="/jobs" 
            className={({ isActive }) => "navbar-link " + (isActive ? "active" : "")}
        >
          Available Shifts
        </NavLink>
        <NavLink 
            to="/my-jobs" 
            className={({ isActive }) => "navbar-link " + (isActive ? "active" : "")}
        >
          Upcoming Shifts
        </NavLink>
        <NavLink 
            to="/profile" 
            className={({ isActive }) => "navbar-link profile-link " + (isActive ? "active" : "")}
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
}

export default HomeNav;