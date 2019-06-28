import React from "react";
import { useStateValue } from "react-conflux";
import { stateContext } from "../store";
import { TableCell, TableRow, Button } from "@material-ui/core";

const Student = props => {
  const [state, dispatch] = useStateValue(stateContext);

  function handleClick() {
    props.history.push(`/my-bp/students/${props.student.userId}`);
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <Button
            onClick={e => {
              e.preventDefault();
              handleClick();
            }}
          >{`${props.student.studentData.lastName}, ${
            props.student.studentData.firstName
          }`}</Button>
        </TableCell>

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
