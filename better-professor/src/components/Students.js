import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue } from "react-conflux";
import { stateContext, STUDENT_SEARCH_FAIL } from "../store";
import {
  Container,
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
import SearchIcon from "@material-ui/icons/Search";

import Student from "./Student";

const Students = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("https://better-professor.herokuapp.com/user/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("RES.DATA", res.data);
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
        dispatch({
          type: STUDENT_SEARCH_FAIL,
          payload: `${err.response.status}
            ${err.response.data.error_description}`
        });
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
    <Container>
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
      <div style={{ marginTop: "6rem" }}>
        <TextField
          placeholder="Search"
          variant="outlined"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
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
              {searchText.length > 0
                ? students
                    .filter(student => {
                      const lclast = student.studentData.lastName.toLowerCase();
                      const lcfirst = student.studentData.firstName.toLowerCase();

                      const filter = searchText.toLowerCase();
                      return (
                        lclast.includes(filter) || lcfirst.includes(filter)
                      );
                    })
                    .map((student, index) => (
                      <Student
                        student={student}
                        index={index}
                        key={index}
                        history={props.history}
                      />
                    ))
                : students.map((student, index) => (
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
    </Container>
  );
};

export default Students;
