import React, { useState } from "react";
import Calendar from "react-calendar";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = date => setDate(date);

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

//Clickable days that expand and show a list?
//Possibly scratch or find a new one
//Need a list of upcoming events/trackers

export default MyCalendar;
