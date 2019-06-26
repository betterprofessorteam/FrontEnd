import React, { useEffect, useState } from "react";
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

  //   useEffect(() => {
  //     axios
  //       .get("https://better-professor.herokuapp.com/user/students", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`
  //         }
  //       })
  //       .then(res => {
  //         console.log("RES.DATA", res.data);
  //         setStudents(res.data);
  //       })
  //       .catch(err => {
  //         dispatch({
  //           type: STUDENT_SEARCH_FAIL,
  //           payload: `${err.response.status}
  //           ${err.response.data.error_description}`
  //         });
  //       });
  //   }, []);

  useEffect(() => {
    axios
      .get("https://better-professor.herokuapp.com/user/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch({ type: STUDENT_SEARCH, payload: res.data });
      })
      .catch(err => {
        console.log(
          `${err.response.status} ${err.response.data.error_description}`
        );
        dispatch({
          type: STUDENT_SEARCH_FAIL,
          payload: `${err.response.status} ${
            err.response.data.error_description
          }`
        });
      });
  }, []);

  console.log("STUDENTS STATE", state);
  console.table(state.students[0]);

  const theStudents = [
    {
      firstName: "John",
      lastName: "Smith",
      email: "johnsmith@yahoo.com",
      username: "jojoyoyo"
    },
    {
      firstName: "Becca",
      lastName: "Johnson",
      email: "bjohnson@gmail.com",
      username: "bjohnson"
    },
    {
      firstName: "Amber",
      lastName: "Gordon",
      email: "wowokay@yahoo.com",
      username: "agord1"
    },
    {
      firstName: "Greg",
      lastName: "Apple",
      email: "the1andonly@hotmail.com",
      username: "apple-time5000"
    }
  ];

  return (
    <Container>
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
            {theStudents.map((student, index) => (
              <Student student={student} index={index} key={index} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Students;
