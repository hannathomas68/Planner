import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/timer">Timer</Link></li>
        <li><Link to="/encouragement">Encouragement</Link></li>
        <li><Link to="/studyplan">Study Plan</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;