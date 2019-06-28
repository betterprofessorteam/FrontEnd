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

  const sendMessage = body => {
    axios
      .post(`https://better-professor.herokuapp.com/messages`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("RES.DATA", res.data);
        props.history.push("/my-bp/inbox");
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: SEND_MESSAGE_FAIL, payload: err.response });
        alert("Sorry, something seems to have went wrong. Please try again.");
      });
  };

  return (
    <div style={{ marginTop: "6rem" }}>
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
        <div style={{ display: "flex" }}>
          <div
            style={{ marginLeft: "1rem", marginRight: "6rem", width: "6rem" }}
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
          </div>

          <TextField
            type="text"
            label="Title/Subject"
            variant="outlined"
            value={titleText}
            onChange={e => {
              setTitleText(e.target.value);
            }}
          />
        </div>

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
        <Button variant="contained" color="primary" type="submit">
          Send Message
        </Button>
      </form>
    </div>
  );
};

//Include a search field for list of students/mentors
//Large text-field for message text
//send functionality w/ POST request

export default SendMessage;
