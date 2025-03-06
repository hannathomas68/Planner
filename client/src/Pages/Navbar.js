import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({student, onLogout}) => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/timer">Timer</Link></li>
        <li><Link to="/encouragement">Encouragement</Link></li>
        <li><Link to="/studyplan">Study Plan</Link></li>
        {student ? (
          <li>
            <button className="logout-button" onClick={onLogout}>Logout</button>
          </li>
        ) : (
          <li><Link to="/auth">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;