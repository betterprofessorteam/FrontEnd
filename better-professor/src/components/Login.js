import React, { useState } from "react";
import { useStateValue } from "react-conflux";
import { stateContext, LOGIN_SUCCESS, LOGIN_FAIL } from "../store";
import axios from "axios";
import LogoImg from "../photos/LogoImg.png";
import LogoText from "../photos/LogoText.png";

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

  function register() {
    props.history.push("/register");
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            backgroundColor: "#3f51b5",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <img src={LogoImg} style={{ height: "7rem" }} />
          <img src={LogoText} style={{ height: "9rem" }} />
        </div>
        <h1
          style={{ marginTop: "2rem", fontSize: "2rem", marginBottom: "-1rem" }}
        >
          Welcome back!
        </h1>
        <form
          style={{ marginTop: "3rem" }}
          onSubmit={e => {
            e.preventDefault();
            login();
          }}
        >
          <TextField
            type="text"
            fullWidth
            label="Username"
            variant="filled"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <div style={{ width: "20rem", margin: "1rem 0 1.8rem 0" }}>
            <TextField
              type="password"
              fullWidth
              label="Password"
              variant="filled"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
        <p>Don't have an account with us yet?</p>
        <Button onClick={register}>Register Here</Button>
      </div>
    </Container>
  );
};

export default Login;
