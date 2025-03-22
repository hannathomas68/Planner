import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Home.css";

const Home = () => { 

    return(
        <div className="home">
            <h2 className="home-heading">TimeWise</h2>
            <p>Manage your time better and stay organized!</p>
            <div className="todo-wrapper">
                <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
                    initialView="timeGridDay"/>
            </div>
        </div>
    );
}

export default Home;