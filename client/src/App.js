import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ChatGPT
import "./App.css";

import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Calendar from "./Pages/Calendar";
import Timer from "./Pages/Timer";
import Encouragement from "./Pages/Encouragement";
import StudyPlan from "./Pages/StudyPlan";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/encouragement" element={<Encouragement />} />
            <Route path="/studyplan" element={<StudyPlan />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;