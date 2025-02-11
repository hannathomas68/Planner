import './App.css';

import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import Calendar from './Pages/Calendar';
import Timer from './Pages/Timer';
import Encouragement from './Pages/Encouragement';
import StudyPlan from './Pages/StudyPlan';
import Login from './Pages/Login';

function App() {
  return (
    <>
      <Navbar/>
      <Home/>
      <Calendar/>
      <Timer/>
      <Encouragement/>
      <StudyPlan/>
      <Login/>
    </>
  );
}

export default App;
