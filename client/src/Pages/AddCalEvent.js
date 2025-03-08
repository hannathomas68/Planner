import React, {useState} from "react";
import axios from "axios";

const AddCalEvent = ({studentID, onEventAdded}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5001/events/add", {studentId: studentID, title, description, date, startTime, endTime})
            .then((response) => {
                if (response.data.success) {
                    onEventAdded();
                    setTitle("");
                    setDescription("");
                    setDate("");
                    setStartTime("");
                    setEndTime("");
                }
                else {
                    alert("Adding event failed.");
                }
            })
            .catch((error) => {
                console.error("Error adding event:", error);
            });
    };

    return(
        <form onSubmit={handleSubmit}>

            <label>Title: </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>

            <label>Description: </label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>

            <label>Date: </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>

            <label>Start Time: </label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>

            <label>End Time: </label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>

            <button type="submit">Add</button>
        </form>
    );
}

export default AddCalEvent;