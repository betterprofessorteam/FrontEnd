import React, { useState } from "react";
import { useStateValue } from "react-conflux";
import { stateContext, LOGIN_SUCCESS, LOGIN_FAIL } from "../store";
import axios from "axios";
import {
  Button,
  TextField,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

const Login = props => {
  const [state, dispatch] = useStateValue(stateContext);
  const [open, setOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const login = () => {
    axios
      .post(
        "https://better-professor.herokuapp.com/oauth/token",
        new URLSearchParams({
          username: username,
          password: password,
          grant_type: "password"
        }),
        {
          headers: {
            Authorization:
              "Basic YmV0dGVyLXByb2Zlc3Nvci1jbGllbnQ6YmV0dGVyLXByb2Zlc3Nvci1zZWNyZXQ=",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.access_token);
        dispatch({ type: LOGIN_SUCCESS });
        props.history.push("/my-bp/dash");
      })
      .catch(err => {
        handleOpen();
        dispatch({
          type: LOGIN_FAIL,
          payload: `${err.response.status} ${
            err.response.data.error_description
          }`
        });
      });
  };

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
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
            Invalid username and password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <form
        onSubmit={e => {
          e.preventDefault();
          login();
        }}
      >
        <TextField
          type="text"
          placeholder="Username"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="Password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Login;
