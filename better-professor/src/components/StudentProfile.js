import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LinearProgress,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

const StudentProfile = props => {
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

  return (
    <Container>
      <h1 style={{ fontSize: "2rem" }}>
        {student.studentData.firstName} {student.studentData.lastName}
      </h1>
      <h3 style={{ fontSize: "1rem" }}>Email: {student.email}</h3>
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
