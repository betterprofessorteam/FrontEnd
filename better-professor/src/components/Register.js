import React, { useState } from "react";
import { useStateValue } from "react-conflux";
import { stateContext, REGISTER_SUCCESS, REGISTER_FAIL } from "../store";
import axios from "axios";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  TextField,
  Container
} from "@material-ui/core";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    fieldset {
      border-color: orange;
    }
  }
  .PrivateNotchedOutline-root-45 {
    margin-top: 1rem;
  }
`;

const Register = props => {
  const [state, dispatch] = useStateValue(stateContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");

  const register = body => {
    axios
      .post(`https://better-professor.herokuapp.com/users`, body)
      .then(res => {
        console.log(res.data);
        dispatch({ type: REGISTER_SUCCESS });
        props.history.push("/register-success");
        return true;
      })
      .catch(err => {
        console.log(err.response);
        dispatch({
          type: REGISTER_FAIL,
          payload: `${err.response.status} ${
            err.response.data.error_description
          }`
        });
      });
  };

  return (
    <Container>
      <h1 style={{ fontSize: "2rem" }}>Register an account with us!</h1>
      <form
        className="register-group"
        onSubmit={e => {
          e.preventDefault();
          if (userType === "mentor") {
            const body = {
              username: username,
              password: password,
              email: email,
              mentorData: { firstName, lastName }
            };
            register(body);
          } else {
            const body = {
              username: username,
              password: password,
              email: email,
              studentData: { firstName, lastName }
            };
            register(body);
          }
        }}
      >
        <TextField
          fullWidth="true"
          type="text"
          placeholder="First Name"
          variant="outlined"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <TextField
          fullWidth="true"
          type="text"
          placeholder="Last Name"
          variant="outlined"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <TextField
          fullWidth="true"
          type="text"
          placeholder="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          fullWidth="true"
          type="text"
          placeholder="Username"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          fullWidth="true"
          type="password"
          placeholder="Password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p style={{ fontSize: "1.1rem" }}>Please select an account type</p>
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
        <p style={{ color: "#404142" }}>*All fields are required</p>
        <p style={{ color: "#404142" }}>
          *Username and Password must be 6 characters long and may only contain
          letters and numbers
        </p>

        <Button
          fullWidth="true"
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Register;
