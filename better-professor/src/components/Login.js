import React, { useState } from "react";
import { useStateValue } from "react-conflux";
import { stateContext, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from "../store";
import axios from "axios";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const login = body => {
    dispatch({ type: LOGIN_START });
    axios
      .post(
        "https://better-professor.herokuapp.com/oauth/token",
        new URLSearchParams({
          username,
          password,
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
        localStorage.setItem("token", res.data.access_token);
        dispatch({ type: LOGIN_SUCCESS });
        props.history.push("/my-calendar");
        return true;
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: LOGIN_FAIL,
          payload: err
        });
      });
  };

  return (
    <Container>
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
          type="text"
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
