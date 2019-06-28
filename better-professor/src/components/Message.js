import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  TableRow,
  TableCell,
  Button,
  Typography,
  Modal,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: "none"
    }
  })
);

function Message(props) {
  const [senderName, setSenderName] = useState("");
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(
        `https://better-professor.herokuapp.com/users/${
          props.message.senderUserId
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        if (res.data.mentorData) {
          setSenderName(
            `${res.data.mentorData.firstName} ${res.data.mentorData.lastName}`
          );
        } else {
          setSenderName(
            `${res.data.studentData.firstName} ${res.data.studentData.lastName}`
          );
        }
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong loading your messages. Please try again.");
      });
  }, []);

  const markAsRead = () => {
    axios
      .post(
        `https://better-professor.herokuapp.com/messages/${
          props.message.messageId
        }/read`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        console.log(res.data);
        alert("SUCCESS");
      })
      .catch(err => {
        console.log(err.response);
        alert("Something went wrong");
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          {props.message.timeRead === 0 ? (
            <RadioButtonUheckedIcon />
          ) : (
            <RadioButtonCheckedIcon />
          )}
        </TableCell>
        <TableCell>
          {moment(props.message.timeSent).format("MMMM Do YYYY")}
        </TableCell>
        <TableCell>{senderName}</TableCell>
        <TableCell>
          <Button
            onClick={e => {
              e.preventDefault();
              handleOpen();
            }}
          >
            {props.message.title}
            <ExpandMore />
          </Button>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={open}
            onClose={handleClose}
          >
            <div
              style={{
                top: `50%`,
                left: `50%`,
                transform: `translate(-50%, -50%)`
              }}
              className={classes.paper}
            >
              <Typography variant="h6" id="modal-title">
                Message Body:
              </Typography>
              <Typography variant="subtitle1" id="modal-description">
                {props.message.text}
              </Typography>
              {props.message.receiverUserId == localStorage.getItem("userId") &&
                props.message.timeRead == 0 && (
                  <Button
                    onClick={e => {
                      e.preventDefault();

                      markAsRead();
                    }}
                  >
                    Mark as Read
                  </Button>
                )}
            </div>
          </Modal>
        </TableCell>
      </TableRow>
    </>
  );
}
export default Message;
