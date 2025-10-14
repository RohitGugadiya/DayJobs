
import React from "react";
import HomeNav from "../components/NavBar";
import "../CSS/HomePage.css";

export default function Home({ children }) {
  return (
    <div className="layout">
      
      <header className="layout-header">
        <HomeNav />
      </header>

      
      <main className="layout-main">{children}</main>

      
      <footer className="layout-footer">
        © {new Date().getFullYear()} DayJobs — All rights reserved.
      </footer>
    </div>
  );
}
