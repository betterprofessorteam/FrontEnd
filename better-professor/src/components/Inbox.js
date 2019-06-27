import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Message from "./Message";
import {
  Container,
  Button,
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Switch
} from "@material-ui/core";

const Inbox = () => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [sentView, setSentView] = useState(false);

  const getReceivedMessages = () => {
    axios
      .get("https://better-professor.herokuapp.com/messages/received", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        setReceivedMessages(res.data);
      })
      .catch(err => {
        console.log(err.response);
        handleOpen();
      });
  };

  const getSentMessages = () => {
    axios
      .get("https://better-professor.herokuapp.com/messages/sent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        setSentMessages(res.data);
      })
      .catch(err => {
        console.log(err.response);
        handleOpen();
      });
  };

  useEffect(() => {
    getReceivedMessages();
    getSentMessages();
  }, []);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="inbox">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Opps!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Something went wrong when loading your messages. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {receivedMessages.length === 0 && (
        <div className="loading-messages">
          <p>Loading Messages...</p>
          <LinearProgress />
        </div>
      )}

      <p>Inbox/Sent Messages</p>
      <Switch
        onChange={e => {
          e.preventDefault();
          sentView === false ? setSentView(true) : setSentView(false);
        }}
        color="default"
      />
      <div className="message-table">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Read</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>{sentView === true ? "To" : "False"}</TableCell>
                <TableCell>Subject/Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receivedMessages.length === 0 && sentMessages.length === 0
                ? "Loading"
                : sentView === false
                ? receivedMessages.map((message, index) => (
                    <Message message={message} key={index} index={index} />
                  ))
                : sentMessages.map((message, index) => (
                    <Message message={message} key={index} index={index} />
                  ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
};

export default Inbox;
