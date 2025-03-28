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

    // Fetch events from backend
    const fetchEvents = () => {
        axios.get(`http://localhost:5001/events/${studentID}`)
        .then(response => setEvents(response.data.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime
        }))))
        .catch(error => console.error("Error fetching events:", error));
    };

    // Delete event
    const handleEventDeletion = (eventInfo) => {
        const eventId = eventInfo.event.id;

        if (window.confirm("Are you sure you want to delete this event?")) {
            axios.delete(`http://localhost:5001/events/delete/${eventId}`)
            .then(response => {
                if (response.data.success) {
                    fetchEvents(); // Refresh events after a deletion
                }
            })
            .catch(error => console.error("Error deleting event:", error));
        }
    };

    return(
        <div className="calendar">
            <h2 className="cal-heading">Calendar</h2>
            <div className="cal-wrapper">
                <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
                    initialView="dayGridMonth" 
                    events={events} 
                    editable={true}
                    eventClick={handleEventDeletion} // Allows event to be deleted
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