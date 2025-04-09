import React, {useState, useEffect} from "react";
import "./StudyPlan.css";

const StudyPlan = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [studyMethods, setStudyMethods] = useState([]);
    const [timesAvailable, setTimesAvailable] = useState([{start: "", end: ""}]);

    const handleMethodChange = (method) => {
        setStudyMethods((prev) => 
            prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]);
    };

    const handleFreeTimeChange = (index, field, value) => {
        const updated = [...timesAvailable];
        updated[index][field] = value;
        setTimesAvailable(updated);
    };

    const addFreeTimeBlock = () => {
        setTimesAvailable([...timesAvailable, {start: "", end: ""}]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({title, date, startTime, studyMethods, timesAvailable});
    };
    
    return(
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

                    <button type="button" onClick={addFreeTimeBlock} className="addTime">Add Time</button>

                    <br/>
                    <button type="submit" className="submitButton">Generate Study Plan</button>
                    
                </form>
            </div>
        </div>
    );
}

export default StudyPlan;