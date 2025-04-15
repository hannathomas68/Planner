import React, {useState, useEffect} from "react";
import axios from "axios";
import "./StudyPlan.css";

const StudyPlan = ({studentID}) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [studyMethods, setStudyMethods] = useState([]);
    const [timesAvailable, setTimesAvailable] = useState([{start: "", end: ""}]);
    const [generatedPlan, setGeneratedPlan] = useState([]);

    // Change preferred study method selection
    const handleMethodChange = (method) => {
        setStudyMethods((prev) => 
            prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]);
    };

    // Change free time range
    const handleFreeTimeChange = (index, field, value) => {
        const updated = [...timesAvailable];
        updated[index][field] = value;
        setTimesAvailable(updated);
    };

    // Add another blank free time range
    const addFreeTimeBlock = () => {
        setTimesAvailable([...timesAvailable, {start: "", end: ""}]);
    };

    // Generate study sessions
    const generatePlan = () => {
        const sessions = [];
        const methodCount = studyMethods.length;
        const minSessionLength = 30;

        if (methodCount === 0) return sessions;

        timesAvailable.forEach((block) => {
            const start = new Date(block.start);
            const end = new Date(block.end);
            const totalMinutes = (end - start) / 60000; // msec to min

            // Split available times based on preferred study methods
            const splitMinutes = Math.floor(totalMinutes / methodCount);
            let sessionStart = new Date(start);

            studyMethods.forEach((method) => {
                const sessionEnd = new Date(sessionStart.getTime() + splitMinutes * 60000);
                sessions.push({
                    method,
                    start: sessionStart.toLocaleString(),
                    end: sessionEnd.toLocaleString()
                });

                sessionStart = sessionEnd;
            });
        });

        return sessions;
    }

    const clearForm = () => {
        setTitle("");
        setDate("");
        setStartTime("");
        setStudyMethods([]);
        setTimesAvailable([{ start: "", end: "" }]);
        setGeneratedPlan([]);
      };

    const addTestInfo = () => {
        // Add test info to db and calendar
        axios
            .post("http://localhost:5001/events/add", {studentId: studentID, title, description: null, date, startTime, endTime: null})
            .then((response) => {
                if (response.data.success) {
                }
                else {
                    alert("Adding event failed.");
                }
            })
            .catch((error) => {
                console.error("Error adding event:", error);
                console.log("Student id:", studentID);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({title, date, startTime, studyMethods, timesAvailable});

        const plan = generatePlan();
        setGeneratedPlan(plan);
    };
    
    return(
        <div className="studyPlanBckgrnd">
        <div className="studyPlan">
            <h2>Study Plan Generator</h2>

            <div className="studyPlanEvent">
                <form onSubmit={handleSubmit} className="studyForm">
                    
                    <label>Test Name: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>

                    <label>Test Date: </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>

                    <label>Test Time: </label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required/>
                    <br/>
                    <br/>

                    <label>Preferred Study Methods: </label>
                    <div className="checkboxes">
                        {["Flashcards", "Practice Test", "Readings", "Review Notes", "Videos", "Other"].map((method) => (
                            <label key={method}>
                                <input type="checkbox" value={method} checked={studyMethods.includes(method)}
                                onChange={() => handleMethodChange(method)}/>
                                {method}
                            </label>
                        ))}
                    </div>
                    <br/>

                    <label>Available Study Times: </label>

                    {timesAvailable.map((block, index) => (
                    // Allow user to enter what times they are free to study
                    <div key={index} className="freeTimes">
                        <label>From: </label>
                        <input type="datetime-local" value={block.start}
                        onChange={(e) => handleFreeTimeChange(index, "start", e.target.value)} required/>

                        <label>To: </label>
                        <input type="datetime-local" value={block.end}
                        onChange={(e) => handleFreeTimeChange(index, "end", e.target.value)} required/>

                        {timesAvailable.length > 1 && (
                        // Add a delete button if there is more than one time frame
                        <button type="button" className="deleteTime"
                            onClick={() => {
                            const updated = timesAvailable.filter((_, i) => i !== index);
                            setTimesAvailable(updated);
                            }}>X</button>
                        )}
                    </div>
                    ))}

                    <button type="button" onClick={addFreeTimeBlock} className="addTime">Add Time Frame</button><br/><br/>

                    <button type="button" onClick={addTestInfo} className="addTestInfoButton">Add Test Info to Calendar</button><br/>

                    <button type="button" onClick={clearForm} className="clearButton">Clear All</button><br/>

                    <button type="submit" className="submitButton">Generate Study Plan</button>
                    
                </form>
            </div>

            {generatedPlan.length > 0 && (
                <div className="generatedPlan">
                    <h3>Generated Study Plan - Please Take a Screenshot</h3>
                    <ul>
                        {generatedPlan.map((session, idx) => (
                            <li key={idx}>
                                <strong>{session.method}</strong>: {session.start} to {session.end}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </div>
    );
}

export default StudyPlan;