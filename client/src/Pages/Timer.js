import React, {useState, useEffect} from "react";
import "./Timer.css";

const Timer = () => {

    const STUDY_TIME = 3;
    const SHORT_TIME = 1;
    const LONG_TIME = 2;

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
                        handleIncrementChange();
                    }
                    return prevSec - 1;
                });
            }, 1000);
        }
        else if (!isRunning && secRemaining !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, secRemaining]
    );

    const handleIncrementChange = () => {
        if (incrementType === "study") {
            if (sessionCount < 3) {
                setIncrementType("short");
                setSecRemaining(SHORT_TIME);
            }
            else {
                setIncrementType("long");
                setSecRemaining(LONG_TIME);
                setSessionCount(0);
            }
            setSessionCount(prev => prev + 1);
        }
        else {
            setIncrementType("study");
            setSecRemaining(STUDY_TIME);
        }

        setIsRunning(false);
    }

  /*   const startPauseTimer = () => {
        setIsRunning(!isRunning);
    }

    const resetTimer = () => {
        setIsRunning(false);
        if (incrementType === "study") {
            setSecRemaining(STUDY_TIME);
        }
        else if (incrementType === "short") {
            setSecRemaining(SHORT_TIME);
        }
        else {
            setSecRemaining(LONG_TIME);
        }
    } */

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return(
        <div className="timer">
            <h2>Pomodoro Timer</h2>
            <p className="time-display">{formatTime(secRemaining)}</p>
            <button onClick={() => setIsRunning(!isRunning)} className="start-button">{isRunning ? "Pause" : "Start"}</button>
            <button onClick={() => {setSecRemaining(STUDY_TIME); setIsRunning(false);}} className="reset-button">Reset</button>
            <p>{`Current Session: ${incrementType.toUpperCase()}`}</p>
        </div>
    );
};

export default Timer;