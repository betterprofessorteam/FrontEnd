import React, { useState } from "react";
import { useStateValue } from "react-conflux";
import { stateContext } from "../store/contexts";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from "../store/constants";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  const [state, dispatch] = useStateValue(stateContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const login = creds => {
    dispatch({ type: LOGIN_START });
    return axiosWithAuth()
      .post("/oauth/token", creds)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        dispatch({ type: LOGIN_SUCCESS });
        return true;
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAIL, payload: err.response.message });
      });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const creds = { username, password };
        login(creds);
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
  );
};

export default Login;
