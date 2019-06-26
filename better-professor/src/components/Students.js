import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "react-conflux";
import {
  stateContext,
  STUDENT_SEARCH_SUCCESS,
  STUDENT_SEARCH_FAIL
} from "../store";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Students = () => {
  const [state, dispatch] = useStateValue(stateContext);

  useEffect(() => {
    axios
      .get("https://better-professor.herokuapp.com/user/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch({ type: STUDENT_SEARCH_SUCCESS, payload: res.data });
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

  console.log("STATE", state);
  console.table(state.students);

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
      {/* <AppBar>
        <h1>students</h1>
      </AppBar> */}

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
            {theStudents.map(student => (
              <TableRow key={student.firstName}>
                <TableCell>{`${student.lastName}, ${
                  student.firstName
                }`}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Students;
