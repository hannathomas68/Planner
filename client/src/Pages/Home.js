import React, {useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import moment from "moment";
import "./Home.css";

const Home = ({studentID}) => { 
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (studentID) {
            fetchEvents();
        }
    });

    const fetchEvents = () => {
        axios.get(`http://localhost:5001/events/${studentID}`)
            .then(response => {
                console.log("Fetched Events:", response.data);

                const formattedEvents = response.data.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: moment(`${event.date} ${event.startTime}`, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss"),
                    end: moment(`${event.date} ${event.endTime}`, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss"),
                }));

                console.log("Formatted Events:", formattedEvents);
                setEvents(formattedEvents);
            })
            .catch(error => console.error("Error fetching events:", error));
    };

    return(
        <div className= "homeBkgrnd">
            <div className="home">
                <h2 className="home-heading">TimeWise</h2>
                <p>Manage your time better and stay organized!</p>
                <div className="todo-wrapper">
                    <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
                        initialView="timeGridDay"
                        events={events}
                        editable={false}
                    />
                </div>
            </div>
        </div>
    );
}


export default Home;