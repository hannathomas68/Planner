import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ChatGPT

import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import Calendar from './Pages/Calendar';
import Timer from './Pages/Timer';
import Encouragement from './Pages/Encouragement';
import StudyPlan from './Pages/StudyPlan';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Calendar" element={<Calendar/>}/>
        <Route path="/Timer" element={<Timer/>}/>
        <Route path="/Encouragement" element={<Encouragement/>}/>
        <Route path="/Studyplan" element={<StudyPlan/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
      <p>Hello world</p>
    </Router>
    
  );
}

export default App;
