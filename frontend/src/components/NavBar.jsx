import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/NavBar.css";

function HomeNav() {
  return (
    <nav className="custom-navbar">
      <div className="navbar-brand">Kick on</div>
      <div className="navbar-links">
        <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/jobs" className={({ isActive }) => (isActive ? "active" : "")}>
          Jobs
        </NavLink>
        <NavLink to="/upcoming" className={({ isActive }) => (isActive ? "active" : "")}>
          Upcoming Jobs
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          Profile
        </NavLink>
      </div>
    </nav>
  );
}

export default HomeNav;
