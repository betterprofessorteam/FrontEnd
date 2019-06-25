import React, { useState } from "react";
import { useStateValue } from "react-conflux";
import {
  stateContext,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../store";
import axios from "axios";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Register = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const register = body => {
    dispatch({ type: REGISTER_START });
    axios
      .post(`https://better-professor.herokuapp.com/users`, body)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("username", res.data.username);
        dispatch({ type: REGISTER_SUCCESS });
        props.history.push("/login");
        return true;
      })
      .catch(err => {
        console.log(`${err.response.data.status} ${err.response.data.error}`);
        dispatch({
          type: REGISTER_FAIL,
          payload: `${err.response.data.status} ${err.response.data.error}`
        });
      });
  };

  return (
    <Container>
      <form
        onSubmit={e => {
          e.preventDefault();
          const body = {
            username,
            password,
            mentorData: { firstName, lastName }
          };
          register(body);
        }}
      >
        <TextField
          type="text"
          placeholder="First Name"
          variant="outlined"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="Last Name"
          variant="outlined"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
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

export default Register;
