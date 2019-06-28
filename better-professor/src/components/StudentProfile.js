import React, { useEffect, useState } from "react";
import axios from "axios";
import { stateContext, ADD_STUDENT_FAIL } from "../store";
import { useStateValue } from "react-conflux";
import moment from "moment";
import {
  LinearProgress,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const StudentProfile = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const studentId = props.match.params.id;
  const [student, setStudent] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`https://better-professor.herokuapp.com/users/${studentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("STUDENT INFO: ", res.data);
        setStudent(res.data);
        axios
          .get(
            `https://better-professor.herokuapp.com/projects/student/${studentId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          )
          .then(res => {
            console.log("STUDENT PROJECTS: ", res.data);
            setIsAdded(true);
            setProjects(res.data);
          })
          .catch(error => {
            setProjects([
              {
                id: -1,
                title: `You must be this student's mentor to view their projects`,
                deadline: 0
              }
            ]);
          });
      });
  }, []);
  if (student === null) {
    return <LinearProgress />;
  }

  const addStudent = () => {
    axios
      .post(
        `https://better-professor.herokuapp.com/user/mentor/students/${studentId}/add`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        console.log("RESPONSE: ", res);
      })
      .catch(err => {
        console.log("ERROR: ", err.response);
        dispatch({
          type: ADD_STUDENT_FAIL,
          payload: err.response.data.error_description
        });
        // alert("Sorry, something seems to have went wrong. Please try again.");
      });
  };

  const removeStudent = () => {
    axios
      .post(
        `https://better-professor.herokuapp.com/user/mentor/students/${studentId}/remove`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        console.log("RESPONSE: ", res);
        window.location.reload();
      })
      .catch(err => {
        console.log("ERROR: ", err.response);
      });
  };

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
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will no longer be able to contact this student or view their
            projects. Do you still want to remove them?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Nevermind
          </Button>
          <Button onClick={removeStudent} color="secondary">
            Yes, Remove Student
          </Button>
        </DialogActions>
      </Dialog>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        {student.studentData.firstName} {student.studentData.lastName}
      </h1>

      {!isAdded ? (
        <Button
          onClick={e => {
            e.preventDefault();
            addStudent();
            window.location.reload();
          }}
        >
          <AddCircleIcon />
          Add to My Students
        </Button>
      ) : (
        <Button
          color="secondary"
          onClick={e => {
            e.preventDefault();
            handleOpen();
          }}
        >
          <RemoveCircleIcon />
          Remove from students
        </Button>
      )}
      <h3 style={{ fontSize: "1rem", marginTop: "1.5rem" }}>
        Email: {student.email}
      </h3>
      <h3 style={{ fontSize: "1rem" }}>Username: {student.username}</h3>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Due Date</TableCell>
              {/* <TableCell>Tracker</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => {
              return (
                <>
                  <TableRow>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>
                      {moment(project.deadline).format("MMMM Do YYYY")}
                    </TableCell>
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

export default StudentProfile;
