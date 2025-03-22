import React, {useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import AddCalEvent from "./AddCalEvent";
import "./Calendar.css";

const Calendar = ({studentID}) => {
    const [events, setEvents] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        fetchEvents();
    });

    const fetchEvents = () => {
        axios.get(`http://localhost:5001/events/${studentID}`)
        .then(response => setEvents(response.data.map(event => ({
            id: event.id,
            title: event.title,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime
        }))))
        .catch(error => console.error("Error fetching events:", error));
    };

    return(
        <div className="calendar">
            <h2 className="cal-heading">Calendar</h2>
            <div className="cal-wrapper">
                <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
                    initialView="dayGridMonth" events={events} 
                    headerToolbar={{
                        start: "today,prev,next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}/>
            </div>
            
            <button className="add-event-btn" onClick={() => setShowAdd(true)}>Add Event</button>
            {showAdd && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowAdd(false)}>X</button>
                        <AddCalEvent studentID={studentID} onEventAdded={() => {
                            fetchEvents();
                            setShowAdd(false);
                        }} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Calendar;