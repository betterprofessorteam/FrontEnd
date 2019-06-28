import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue } from "react-conflux";
import { stateContext } from "../store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

import Student from "../components/Student";

const MyStudents = props => {
  const [state, dispatch] = useStateValue(stateContext);
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://better-professor.herokuapp.com/user/mentor/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("MY STUDENTS DATA: ", res.data);
        setStudents(
          res.data.sort((a, b) =>
            a.studentData.lastName > b.studentData.lastName
              ? 1
              : a.studentData.lastName === b.studentData.lastName
              ? 1
              : -1
          )
        );
      })
      .catch(err => {
        console.log(err.response);
        handleOpen();
      });
  }, []);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div style={{ marginTop: "6rem" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Opps!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Something went wrong when loading the students. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <h1 style={{ fontSize: "2rem" }}>My Students</h1>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length > 0 &&
              students.map((student, index) => (
                <Student
                  student={student}
                  index={index}
                  key={index}
                  history={props.history}
                />
              ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default MyStudents;
