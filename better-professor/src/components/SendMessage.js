import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "react-conflux";
import axios from "axios";
import { stateContext, SEND_MESSAGE_FAIL } from "../store";

import { Editor } from '@tinymce/tinymce-react';

import {
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const SendMessage = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const [titleText, setTitleText] = useState("");
  const [messageText, setMessageText] = useState({});
  const [receiverUserId, setReceiverUserId] = useState("");
  const [loaded, setLoaded] = useState(false);

  const sendMessage = body => {
    axios
      .post(`https://better-professor.herokuapp.com/messages`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("RES.DATA", res.data);
        props.history.push("/my-bp/messages");
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch({ type: SEND_MESSAGE_FAIL, payload: err.response });
        // alert("Sorry, something seems to have went wrong. Please try again.");
      });
  };

  function handleEditorChange(content) {
    setLoaded(false);
    setMessageText({ content })
  }

  return (
    <div style={{ marginTop: "6rem" }}>
      
      <form
        onSubmit={e => {
          e.preventDefault();
          const body = {
            title: titleText,
            text: messageText.content,
            senderUserId: `${localStorage.getItem("userId")}`,
            receiverUserId: receiverUserId
          };
          console.log("BODY:", body);
          console.log("MESSAGE TEXT:", messageText)
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
        <Editor 
      apiKey="seoqyye0f5vweemq7gcxskx8x7zmkspyyeszg1l46c7bzxiv"
      value={{messageText}}
      onEditorChange={handleEditorChange}
      init={{ entity_encoding : "raw", elementpath: false, height: 300, statusbar: false }}
      />
        <Button variant="contained" color="primary" type="submit">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default SendMessage;
