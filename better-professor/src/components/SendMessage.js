import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "react-conflux";
import axios from "axios";
import { stateContext, SEND_MESSAGE_FAIL } from "../store";
import {
  Container,
  Button,
  TextField,
  InputLabel,
  Select,
  FormGroup,
  Input,
  MenuItem,
  FormControl
} from "@material-ui/core";

const SendMessage = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const [titleText, setTitleText] = useState("");
  const [messageText, setMessageText] = useState("");
  const [receiverUserId, setReceiverUserId] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("https://better-professor.herokuapp.com/user", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`
  //       }
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       localStorage.setItem("userId", res.data.userId);
  //       return true;
  //     })
  //     .catch(err => {
  //       console.log(err.response);
  //       alert(
  //         "Sorry, something seems to have went wrong. Please try logging in again."
  //       );
  //     });
  // }, []);

  const sendMessage = body => {
    axios
      .post(`https://better-professor.herokuapp.com/messages`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("RES.DATA", res.data);
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: SEND_MESSAGE_FAIL, payload: err.response });
        alert("Sorry, something seems to have went wrong. Please try again.");
      });
  };

  return (
    <Container>
      <form
        onSubmit={e => {
          e.preventDefault();
          const body = {
            title: titleText,
            text: messageText,
            senderUserId: `${localStorage.getItem("userId")}`,
            receiverUserId: receiverUserId
          };
          sendMessage(body);
        }}
      >
        <InputLabel>Send To</InputLabel>
        <Select
          value={receiverUserId}
          onChange={e => {
            setReceiverUserId(e.target.value);
          }}
        >
          {state.students.map(student => (
            <MenuItem key={student.userId} value={student.userId}>{`${
              student.studentData.lastName
            }, ${student.studentData.firstName}`}</MenuItem>
          ))}
        </Select>

        <TextField
          type="text"
          label="Title/Subject"
          variant="outlined"
          value={titleText}
          onChange={e => {
            setTitleText(e.target.value);
          }}
        />

        <TextField
          value={messageText}
          onChange={e => {
            setMessageText(e.target.value);
          }}
          label="Message Body"
          variant="outlined"
          multiline
          fullWidth
          margin="normal"
        />
        <Button type="submit">Send Message</Button>
      </form>
    </Container>
  );
};

//Include a search field for list of students/mentors
//Large text-field for message text
//send functionality w/ POST request

export default SendMessage;
