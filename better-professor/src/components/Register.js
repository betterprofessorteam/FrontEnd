import React, { useState } from "react";
import { useStateValue } from "react-conflux";
import {
  stateContext,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_USER_TYPE
} from "../store";
import axios from "axios";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { FormControlLabel } from "@material-ui/core";

const Register = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");

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
        console.log(err);
        dispatch({
          type: REGISTER_FAIL,
          payload: err
        });
      });
  };

  return (
    <Container>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch({ type: SET_USER_TYPE, payload: userType });
          if (userType === "mentor") {
            const body = {
              username,
              password,
              mentorData: { firstName, lastName }
            };
            register(body);
          } else {
            const body = {
              username,
              password,
              studentData: { firstName, lastName }
            };
            register(body);
          }
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
          type="password"
          placeholder="Password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <RadioGroup
          value={userType}
          onChange={e => setUserType(e.target.value)}
        >
          <FormControlLabel value="mentor" control={<Radio />} label="Mentor" />
          <FormControlLabel
            value="student"
            control={<Radio />}
            label="Student"
          />
        </RadioGroup>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Register;
