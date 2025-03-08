import React, {useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import AddCalEvent from "./AddCalEvent";

const Calendar = ({studentID}) => {
    const [events, setEvents] = useState([]);

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
            <h2>Calendar</h2>
            <AddCalEvent studentID={studentID} onEventAdded={fetchEvents} />
            <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
                initialView="dayGridMonth" events={events} />
        </div>
    )
}

export default Calendar;