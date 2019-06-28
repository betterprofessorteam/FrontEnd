import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = date => setDate(date);

  return (
    <div
      style={{
        marginTop: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>My Calendar</h1>
      <Calendar
        onChange={e => {
          onChange();
          console.log(moment(e).format("MMMM Do YYYY"));
        }}
        value={date}
      />
    </div>
  );
};

//Clickable days that expand and show a list?
//Possibly scratch or find a new one
//Need a list of upcoming events/trackers

export default MyCalendar;
