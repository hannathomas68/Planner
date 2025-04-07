import React, {useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import moment from "moment";
import AddCalEvent from "./AddCalEvent";
import "./Calendar.css";

const Calendar = ({studentID}) => {
    const [events, setEvents] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        // Fetch events
        const fetchEvents = () => {
            axios.get(`http://localhost:5001/events/${studentID}`)
                .then(response => {
                    const newEvents = response.data.map(event => {
                        const startDateTime = moment(`${event.date} ${event.startTime}`, "YYYY-MM-DD hh:mm A").format("YYYY-MM-DDTHH:mm:ss");
                        const endDateTime = moment(`${event.date} ${event.endTime}`, "YYYY-MM-DD hh:mm A").format("YYYY-MM-DDTHH:mm:ss");

                        return {
                            id: event.id,
                            title: event.title,
                            description: event.description,
                            start: startDateTime,
                            end: endDateTime,
                        };
                    });

                    console.log("Fetched Events:", newEvents);
                    setEvents(newEvents);
                })
                .catch(error => console.error("Error fetching events:", error));
        };

        if (studentID) fetchEvents(); // Only fetch if studentID exists
    }, [studentID]); // Only fetch when studentID changes

    // Delete event
    const handleEventDeletion = (eventInfo) => {
        const eventId = eventInfo.event.id;

        if (window.confirm("Are you sure you want to delete this event?")) {
            axios.delete(`http://localhost:5001/events/delete/${eventId}`)
                .then(response => {
                    if (response.data.success) {
                        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
                    }
                })
                .catch(error => console.error("Error deleting event:", error));
        }
    };

    return (
        <div className= "calendarBkgrnd">
        <div className="calendar">
            <h2 className="cal-heading">Calendar</h2>
            <div className="cal-wrapper">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    eventBackgroundColor="orange"
                    eventClick={handleEventDeletion} // Allows event to be deleted after clicking it
                    headerToolbar={{
                        start: "today,prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                />
            </div>

            <button className="add-event-btn" onClick={() => setShowAdd(true)}>Add Event</button>
            {showAdd && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowAdd(false)}>X</button>
                        <AddCalEvent studentID={studentID} onEventAdded={() => {
                            setShowAdd(false);

                            // Fetch events
                            axios.get(`http://localhost:5001/events/${studentID}`)
                                .then(response => {
                                    const newEvents = response.data.map(event => ({
                                        id: event.id,
                                        title: event.title,
                                        description: event.description,
                                        start: moment(`${event.date} ${event.startTime}`, "YYYY-MM-DD hh:mm A").format("YYYY-MM-DDTHH:mm:ss"),
                                        end: moment(`${event.date} ${event.endTime}`, "YYYY-MM-DD hh:mm A").format("YYYY-MM-DDTHH:mm:ss"),
                                    }));
                                    setEvents(newEvents);
                                })
                                .catch(error => console.error("Error fetching events:", error));
                        }} />
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default Calendar;