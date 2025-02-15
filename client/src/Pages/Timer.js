import React, {useState, useEffect} from "react";
import "./Timer.css";

const Timer = () => {

    const [secRemaining, setSecRemaining] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && secRemaining > 0) {
            timer = setInterval(() => {
                setSecRemaining((prevSec) => prevSec - 1);
            }, 1000);
        }
        else if (secRemaining === 0) {
            alert("Break time!!");
            setIsRunning(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, secRemaining]
    );

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return(
        <div className="timer">
            <h2>Pomodoro Timer</h2>
            <p className="time-display">{formatTime(secRemaining)}</p>
            <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Pause" : "Start"}</button>
            <button onClick={() => setSecRemaining(1500)}>Reset</button>
        </div>
    );
};

export default Timer;