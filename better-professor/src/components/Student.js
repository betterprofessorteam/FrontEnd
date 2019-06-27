import React from "react";
import { useStateValue } from "react-conflux";
import { Link } from "react-router-dom";
import { stateContext } from "../store";
import { TableCell, TableRow } from "@material-ui/core";

const Student = props => {
  const [state, dispatch] = useStateValue(stateContext);

  return (
    <>
      <TableRow key={props.student.studentData.firstName}>
        <Link style={{ textDecoration: "none" }} to="/my-bp/user-profile">
          <TableCell>{`${props.student.studentData.lastName}, ${
            props.student.studentData.firstName
          }`}</TableCell>
        </Link>
        <TableCell>{props.student.email}</TableCell>
        <TableCell>{props.student.username}</TableCell>
      </TableRow>
    </>
  );
};

//Include Add/Delete Student functionality with conditional based on if they're already added
//ADD student send a request?
//Can click student to go to their profile(which includes a list of their projects and add/delete functionality w/ same conditional)

export default Student;