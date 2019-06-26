import React, { useEffect, useState, useImperativeHandle } from "react";
import axios from "axios";
import { useStateValue } from "react-conflux";
import { stateContext, STUDENT_SEARCH, STUDENT_SEARCH_FAIL } from "../store";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

import Student from "./Student";

const Students = () => {
  const [state, dispatch] = useStateValue(stateContext);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("https://better-professor.herokuapp.com/user/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("RES.DATA", res.data[0].studentData);
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
      });
  }, []);

  //   useEffect(() => {
  //     axios
  //       .get("https://better-professor.herokuapp.com/user/students", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`
  //         }
  //       })
  //       .then(res => {
  //         console.log(res.data);
  //         dispatch({ type: STUDENT_SEARCH, payload: res.data });
  //       })
  //       .catch(err => {
  //         console.log(
  //           `${err.response.status} ${err.response.data.error_description}`
  //         );
  //         dispatch({
  //           type: STUDENT_SEARCH_FAIL,
  //           payload: `${err.response.status} ${
  //             err.response.data.error_description
  //           }`
  //         });
  //       });
  //   }, []);

  return (
    <Container>
      <input placeholder="Search" />
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
            {students.map((student, index) => (
              <Student student={student} index={index} key={index} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Students;
