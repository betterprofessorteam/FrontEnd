import React, { useEffect, useState } from "react";
import axios from "axios";
import { stateContext, ADD_STUDENT_FAIL } from "../store";
import { useStateValue } from "react-conflux";
import {
  LinearProgress,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const StudentProfile = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const studentId = props.match.params.id;
  const [student, setStudent] = useState(null);
  const [projects, setProjects] = useState([]);

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
    console.log("STUDENT ID: ", studentId);
    axios
      .post(
        `https://better-professor.herokuapp.com/user/mentor/students/${studentId}/add`,
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

  return (
    <Container>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        {student.studentData.firstName} {student.studentData.lastName}
      </h1>

      <Button
        onClick={e => {
          e.preventDefault();
          addStudent();
        }}
      >
        <AddCircleIcon />
        Add to My Students
      </Button>

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
              <TableCell>Tracker</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => {
              return (
                <>
                  <TableRow>
                    <TableCell>{project.title}</TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default StudentProfile;
