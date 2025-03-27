import React, {useState, useEffect} from "react";

function StudyPlan() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [studyMethod, setStudyMethod] = useState("");
    const [dateAvailable, setDateAvailable] = useState("");
    
    return(
        <div>
            <h2>Study Plan Generator</h2>

            <div className="studyPlanEvent">
                <form>
                    <label>Title: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>

                    <label>Description: </label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>

                    <label>Date: </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>

                    <label>Start Time: </label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>

                    <label>Study Methods: </label>
                    <input type="checkbox" value={studyMethod} onChange={(e) => setStudyMethod(e.target.value)} required/>

                    <label>Available Dates: </label>
                    <input type="date" value={dateAvailable} onChange={(e) => setDateAvailable(e.target.value)} required/>

                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default StudyPlan;