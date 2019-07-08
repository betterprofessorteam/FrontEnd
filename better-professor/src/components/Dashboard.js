import React, { useState, useEffect } from "react";
import { useStateValue } from "react-conflux";
import axios from "axios";
import {
  stateContext,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAIL
} from "../store";

import { withStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Container,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";

const Dashboard = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const getStudents = () => {
    axios
      .get("https://better-professor.herokuapp.com/user/mentor/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("GET STUDENTS RES.DATA", res.data);
        dispatch({ type: GET_STUDENTS_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log("GET STUDENTS ERROR", err);
        dispatch({
          type: GET_STUDENTS_FAIL,
          payload: err.response.data.error_description
        });
        handleOpen();
      });
  };

  const getUserInfo = () => {
    axios
      .get("https://better-professor.herokuapp.com/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("USER INFO RES.DATA", res.data);
        localStorage.setItem("userId", res.data.userId);
        if (Object.keys(res.data).includes("mentorData")) {
          localStorage.setItem("userType", "mentor");
          localStorage.setItem("firstName", res.data.mentorData.firstName);
          localStorage.setItem("lastName", res.data.mentorData.lastName);
          getStudents();
        } else {
          localStorage.setItem("userType", "student");
          localStorage.setItem("firstName", res.data.studentData.firstName);
          localStorage.setItem("lastName", res.data.studentData.lastName);
        }
      })
      .catch(err => {
        console.log("USER INFO ERR", err);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    props.history.push("/login");
  }

  function searchStudentsClick() {
    handleMenuClose();
    props.history.push("/my-bp/students");
  }

  function myCalendarClick() {
    handleMenuClose();
    props.history.push("/my-bp/calendar");
  }
  function myStudentsClick() {
    handleMenuClose();
    props.history.push("/my-bp/my-students");
  }

  function accountClick() {
    handleMenuClose();
    props.history.push("/my-bp/account");
  }

  function sendMessageClick() {
    handleMenuClose();
    props.history.push("/my-bp/send-message");
  }

  // function inboxClick() {
  //   handleMenuClose();
  //   props.history.push("/my-bp/inbox");
  // }

  function dashClick() {
    handleMenuClose();
    props.history.push("/my-bp/dash");
  }

  function messagesClick() {
    handleMenuClose();
    props.history.push("/my-bp/messages");
  }

  return (
    <Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Opps!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Something went wrong when loading the page. Please try logging in
            again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <AppBar>
        <Toolbar>
          <IconButton
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={openMenu}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={dashClick}>Upcoming Deadlines</MenuItem>
            <MenuItem onClick={messagesClick}>Messages</MenuItem>
            <MenuItem onClick={sendMessageClick}>Send Message</MenuItem>

            {localStorage.getItem("userType") === "mentor" && (
              <div>
                <MenuItem onClick={searchStudentsClick}>
                  Search Students
                </MenuItem>
                <MenuItem onClick={myStudentsClick}>My Students</MenuItem>
              </div>
            )}
            <MenuItem onClick={myCalendarClick}>My Calendar</MenuItem>
            {/* <MenuItem onClick={inboxClick}>Inbox</MenuItem> */}
            
          </Menu>
          <Typography variant="h6">Menu</Typography>
          <div style={{ marginLeft: "3rem", marginRight: "7rem" }}>
            <h1 style={{ fontSize: "2rem" }}>Better Professor</h1>
          </div>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {
              localStorage.clear();
              props.history.push("/login");
            }}
          >
            Log Out
          </Button>
          <IconButton
            edge="end"
            aria-haspopup="true"
            color="inherit"
            onClick={accountClick}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

//Make a header that has app "logo" and hamburger icon for drawer
//change menu to a drawer from the left side-include: add reminder
//Notifications for New Messages, add requests(students only), trackers/reminders
//Account/profile 'menu' w/ Edit Profile and Delete Account options

export default Dashboard;
