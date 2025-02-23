import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; // ChatGPT
import "./App.css";

import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Calendar from "./Pages/Calendar";
import Timer from "./Pages/Timer";
import Encouragement from "./Pages/Encouragement";
import StudyPlan from "./Pages/StudyPlan";
import Auth from "./Auth";

function App() {

  const [student, setStudent] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:5001/check-auth", {credentials: "include"})
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setStudent(data.student);
        }
      });
  }, []);

  return (
    <Router>
      {student ? (
        <div className="app">
          <Navbar />
          <div className="page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/encouragement" element={<Encouragement />} />
              <Route path="/studyplan" element={<StudyPlan />} />
              <Route path="/auth" element={<Auth onAuthSuccess={setStudent} />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Auth setStudent={setStudent} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;