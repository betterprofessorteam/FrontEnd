import React, { useState } from "react";
import { useStateValue } from "react-conflux";
import { stateContext, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from "../store";
import axios from "axios";

const Login = () => {
  const [state, dispatch] = useStateValue(stateContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const login = () => {
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
        return true;
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAIL, payload: err.response.message });
      });
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          login();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
