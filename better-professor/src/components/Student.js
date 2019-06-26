import React from "react";
import { useStateValue } from "react-conflux";
import { stateContext } from "../store";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const Student = props => {
  const [state, dispatch] = useStateValue(stateContext);

  return (
    <>
      <TableRow key={props.student.firstName}>
        <TableCell>{`${props.student.lastName}, ${
          props.student.firstName
        }`}</TableCell>
        <TableCell>{props.student.email}</TableCell>
        <TableCell>{props.student.username}</TableCell>
      </TableRow>
    </>
  );
};

export default Student;
