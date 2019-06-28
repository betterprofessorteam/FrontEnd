import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

const Dash = props => {
  const [trackers, setTrackers] = useState([]);
  const [loaded, setLoaded] = useState(false);

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

  return (
    <div style={{ marginTop: "6rem" }}>
      <h1 style={{ fontSize: "1.4rem" }}>Upcoming Deadlines</h1>
      {!loaded && <p>Loading...</p>}

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Deadline</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded &&
              trackers.map(tracker => {
                return (
                  <>
                    <TableRow>
                      <TableCell>
                        {moment(tracker.deadline).format("MMMM Do YYYY")}
                      </TableCell>
                      <TableCell>{tracker.type}</TableCell>
                      <TableCell>{tracker.name}</TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Dash;
