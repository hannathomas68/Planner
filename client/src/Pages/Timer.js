import React, {useState, useEffect} from "react";
import "./Timer.css";
import Clock from '../Images/Clock.jpg';

const Timer = () => {
    // Allow user to customize how long each session should be
    const [ownStudyTime, setOwnStudyTime] = useState(25);
    const [ownShortTime, setOwnShortTime] = useState(5);
    const [ownLongTime, setOwnLongTime] = useState(15);

    const [secRemaining, setSecRemaining] = useState(ownStudyTime * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [incrementType, setIncrementType] = useState("study");
    const [sessionCount, setSessionCount] = useState(0);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setSecRemaining((prevSec) => {
                    if (prevSec === 0) {
                        if (incrementType === "study") {
                            if (sessionCount < 2) {
                                setIncrementType("short");
                                setSecRemaining(ownShortTime * 60);
                                setSessionCount(prev => prev + 1)
                            }
                            else {
                                setIncrementType("long");
                                setSecRemaining(ownLongTime * 60);
                                setSessionCount(0);
                            }
                        }
                        else {
                            setIncrementType("study");
                            setSecRemaining(ownStudyTime * 60);
                        }
                        setIsRunning(false);
                    }
                    return prevSec > 0 ? prevSec - 1 : 0;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, incrementType, sessionCount, ownStudyTime, ownShortTime, ownLongTime]
    );

    const handleIncrementSelect = (type) => {
        setIsRunning(false);
        setIncrementType(type);
        if (type === "study") {
            setSecRemaining(ownStudyTime * 60);
        }
        else if (type === "short") {
            setSecRemaining(ownShortTime * 60);
        }
        else if (type === "long") {
            setSecRemaining(ownLongTime * 60);
        }
    }

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

   
    return(
        <div className= "timerBkgrnd">
            <div className="timer">
                <h2>Pomodoro Timer</h2>
                <p className="time-display">{formatTime(secRemaining)}</p>
                <div className="increment-buttons">
                    <button onClick={() => handleIncrementSelect("study")} className={incrementType === "study" ? "active" : ""}>Study</button>
                    <button onClick={() => handleIncrementSelect("short")} className={incrementType === "short" ? "active" : ""}>Short Break</button>
                    <button onClick={() => handleIncrementSelect("long")} className={incrementType === "long" ? "active" : ""}>Long Break</button>
                </div>
                <button onClick={() => setIsRunning(!isRunning)} className="start-button">{isRunning ? "Pause" : "Start"}</button>

                <div className="custom-controls">
                    <label>Study (min):
                        <input type="number" min="5" max="60"
                            value={ownStudyTime}
                            onChange={(e) => setOwnStudyTime(Number(e.target.value))}
                        />
                    </label>
                    <label>Short Break (min):
                        <input type="number" min="1" max="15"
                            value={ownShortTime}
                            onChange={(e) => setOwnShortTime(Number(e.target.value))}
                        />
                    </label>
                    <label>Long Break (min):
                        <input type="number" min="5" max="30"
                            value={ownLongTime}
                            onChange={(e) => setOwnLongTime(Number(e.target.value))}
                        />
                    </label>
                </div>
            </div>

            <div className= "clockBkgrnd">
                <img className="clock-pic" src={Clock} alt="clockpic"/>
            </div>
        </div>
    );

};

export default Timer;