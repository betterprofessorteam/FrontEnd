import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateValue } from "react-conflux";
import { stateContext } from "../store";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

const Account = props => {
  const [state, dispatch] = useStateValue(stateContext);
  const [open, setOpen] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    axios
      .get("https://better-professor.herokuapp.com/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res.data);
        setAccountInfo(res.data);
      })
      .catch(err => {
        console.log(err.response);
        alert("Something went wrong.");
      });
  }, []);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const deleteAccount = () => {
    axios
      .delete("https://better-professor.herokuapp.com/user/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res);
        props.history.push("/login");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting your account will erase all information linked to it. This
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Nevermind
          </Button>
          <Button onClick={deleteAccount} color="primary">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
      <h1>Account Information</h1>

      {/* {accountInfo.mentorData ? (
        <h1>
          Name:
          {`${accountInfo.mentorData.firstName} ${
            accountInfo.mentorData.lastName
          }`}
        </h1>
      ) : (
        <h1>
          Name:
          {`${accountInfo.studentData.firstName} ${
            accountInfo.studentData.lastName
          }`}
        </h1>
      )} */}
      {accountInfo !== null && (
        <>
          <h1 style={{ fontSize: "1.5rem" }}>
            Username: {accountInfo.username}
          </h1>
          <h1 style={{ fontSize: "1.5rem" }}>Email: {accountInfo.email}</h1>
        </>
      )}
      <Button onClick={handleOpen}>Delete Account</Button>
    </div>
  );
};

export default Account;
