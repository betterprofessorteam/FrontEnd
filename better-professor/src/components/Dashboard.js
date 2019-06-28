import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "react-conflux";
import axios from "axios";
import {
  stateContext,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAIL,
  SET_USER_TYPE
} from "../store";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Container,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
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

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const Dashboard = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const getUserId = () => {
    axios
      .get("https://better-professor.herokuapp.com/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res.data);
        localStorage.setItem("userId", res.data.userId);
        return true;
      })
      .catch(err => {
        console.log(err.response);
        alert(
          "Sorry, something seems to have went wrong. Please try logging in again."
        );
      });
  };

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

  const setUserType = () => {
    axios
      .get("https://better-professor.herokuapp.com/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log("USER INFO RES.DATA", res.data);
        if (Object.keys(res.data).includes("mentorData")) {
          dispatch({ type: SET_USER_TYPE, payload: "mentor" });
          getStudents();
        } else {
          dispatch({ type: SET_USER_TYPE, payload: "student" });
        }
      })
      .catch(err => {
        console.log("USER INFO ERR", err);
      });
  };

  useEffect(() => {
    setUserType();
    getUserId();
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

  function profileClick() {
    props.history.push("/my-bp/profile");
  }

  function searchStudents() {
    handleMenuClose();
    props.history.push("/my-bp/students");
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
            <MenuItem onClick={searchStudents}>Search Students</MenuItem>
            <MenuItem>My Students</MenuItem>
            <MenuItem>My Schedule</MenuItem>
            <MenuItem>Inbox</MenuItem>
            <MenuItem>Trackers</MenuItem>
          </Menu>
          <Typography variant="h6">Menu</Typography>
          <Button
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
            onClick={profileClick}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Menu
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <StyledMenuItem>
          {state.userType === "mentor" && (
            <>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <Link to="/my-bp/students">
                <ListItemText primary="Search Students" />
              </Link>
            </>
          )}
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <Link to="/my-bp/calendar">
            <ListItemText primary="My Calendar" />
          </Link>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link to="/my-bp/inbox">
            <ListItemText primary="Inbox" />
          </Link>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <Link to="/my-bp/send-message">
            <ListItemText primary="Send Message" />
          </Link>
        </StyledMenuItem>
      </StyledMenu> */}
    </Container>
  );
};

//Make a header that has app "logo" and hamburger icon for drawer
//change menu to a drawer from the left side-include: add reminder
//Notifications for New Messages, add requests(students only), trackers/reminders
//Account/profile 'menu' w/ Edit Profile and Delete Account options

export default Dashboard;
