import React, {useState, useEffect} from "react";
import "./Timer.css";


const STUDY_TIME = 25 * 60;
const SHORT_TIME = 5 * 60;
const LONG_TIME = 15 * 60;

const Timer = () => {

    const [secRemaining, setSecRemaining] = useState(STUDY_TIME);
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
                                setSecRemaining(SHORT_TIME);
                                setSessionCount(prev => prev + 1)
                            }
                            else {
                                setIncrementType("long");
                                setSecRemaining(LONG_TIME);
                                setSessionCount(0);
                            }
                        }
                        else {
                            setIncrementType("study");
                            setSecRemaining(STUDY_TIME);
                        }
                        setIsRunning(false);
                    }
                    return prevSec > 0 ? prevSec - 1 : 0;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, incrementType, sessionCount]
    );

    const handleIncrementSelect = (type) => {
        setIsRunning(false);
        setIncrementType(type);
        if (type === "study") {
            setSecRemaining(STUDY_TIME);
        }
        else if (type === "short") {
            setSecRemaining(SHORT_TIME);
        }
        else if (type === "long") {
            setSecRemaining(LONG_TIME);
        }
    }

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return(
        <div className="timer">
            <h2>Pomodoro Timer</h2>
            <p className="time-display">{formatTime(secRemaining)}</p>
            <div className="increment-buttons">
                <button onClick={() => handleIncrementSelect("study")} className={incrementType === "study" ? "active" : ""}>Study</button>
                <button onClick={() => handleIncrementSelect("short")} className={incrementType === "short" ? "active" : ""}>Short Break</button>
                <button onClick={() => handleIncrementSelect("long")} className={incrementType === "long" ? "active" : ""}>Long Break</button>
            </div>
            <button onClick={() => setIsRunning(!isRunning)} className="start-button">{isRunning ? "Pause" : "Start"}</button>
        </div>
    );
};

export default Timer;