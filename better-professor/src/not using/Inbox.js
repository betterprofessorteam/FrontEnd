import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Message from "./Message";
import SentMessage from "./SentMessage";
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
  Switch,
  FormGroup
} from "@material-ui/core";

const Inbox = props => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [sentView, setSentView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getReceivedMessages();
    getSentMessages();
  }, []);

  const getReceivedMessages = () => {
    axios
      .get("https://better-professor.herokuapp.com/messages/received", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        setReceivedMessages(
          res.data.sort((a, b) =>
            b.timeSent > a.timeSent ? 1 : b.timeSent === a.timeSent ? 1 : -1
          )
        );
        setLoaded(true);
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
        setSentMessages(
          res.data.sort((a, b) =>
            b.timeSent > a.timeSent ? 1 : b.timeSent === a.timeSent ? 1 : -1
          )
        );
        setLoaded(true);
      })
      .catch(err => {
        console.log(err.response);
        handleOpen();
      });
  };

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div style={{ marginTop: "6rem" }}>
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
      {loaded === false && (
        <div className="loading-messages">
          <p>Loading Messages...</p>
          <LinearProgress />
        </div>
      )}
      <FormGroup row="true">
        <p>Inbox</p>
        <Switch
          onChange={e => {
            e.preventDefault();
            setLoaded(false);
            if (sentView === false) {
              setSentView(true);
              setLoaded(true);
            } else {
              setSentView(false);
              setLoaded(true);
            }
          }}
          color="default"
        />
        <p>Sent Messages</p>
      </FormGroup>
      <div className="message-table">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Read</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>{sentView === true ? "To" : "From"}</TableCell>
                <TableCell>Subject/Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loaded === false
                ? "Loading..."
                : sentView === false
                ? receivedMessages.map(message => (
                    <Message
                      message={message}
                      history={props.history}
                      sentView={false}
                    />
                  ))
                : sentMessages.map(message => (
                    <SentMessage
                      message={message}
                      history={props.history}
                      sentView={true}
                    />
                  ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
};

export default Inbox;
