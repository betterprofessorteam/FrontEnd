import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [trackers, setTrackers] = useState([]);
  const [monthTrackers, setMonthTrackers] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [display, setDisplay] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(false);

  const onClickDay = date => setDate(date);

  useEffect(() => {
    axios
      .get("https://better-professor.herokuapp.com/trackers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res.data);
        setTrackers(
          res.data.sort((a, b) =>
            a.deadline > b.deadline ? 1 : a.deadline === b.deadline ? 1 : -1
          )
        );
        setLoaded(true);
      })
      .catch(err => {
        console.log(err.response);
        alert("Something went wrong.");
      });
  }, []);

  function dateDisplay(calendarDate, trackerDates) {
    const filterdDates = trackerDates.filter(tracker => {
      return tracker === calendarDate;
    });
    if (filterdDates.length > 0) {
      setDisplay(true);
    }
  }

  function monthDisplay(calendarMonth, trackerMonths) {
    const filteredMonths = trackerMonths.filter(month => {
      return month === calendarMonth;
    });
    if (filteredMonths.length > 0) {
      setDisplayMonth(true);
      setMonthTrackers(filteredMonths);
      console.log(monthTrackers);
    }
  }

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
        onClickDay={e => {
          setDisplay(false);
          onClickDay();
          const calendarDate = moment(e).format("MMMM Do YYYY");
          const trackerDates = trackers.map(tracker => {
            return moment(tracker.deadline).format("MMMM Do YYYY");
          });
          dateDisplay(calendarDate, trackerDates);
          console.log(moment(e).format("MMMM"));
        }}
        value={date}
        view="year"
        showNavigation="false"
        onChange={e => {
          console.log(e);
        }}
        onClickMonth={e => {
          const calendarMonth = moment(e).format("MMMM");
          const trackerMonths = trackers.map(tracker => {
            return moment(tracker.deadline).format("MMMM");
          });
          monthDisplay(calendarMonth, trackerMonths);
          console.log(calendarMonth);
          console.log(trackerMonths);
        }}
      />
      {displayMonth === true && <h1>YO</h1>}
      {display === true && <h1>Deadlines</h1>}
    </div>
  );
};

//Clickable days that expand and show a list?
//Possibly scratch or find a new one
//Need a list of upcoming events/trackers

export default MyCalendar;
