import React, { useState } from "react";
import { useStateValue } from "react-conflux";
import {
  stateContext,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../store";
import axios from "axios";

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
    <>
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
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
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

export default Register;
