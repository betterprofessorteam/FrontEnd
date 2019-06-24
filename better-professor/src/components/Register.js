import React, { useState } from "react";
import { useStateValue } from "react-conflux";
import { stateContext } from "../store/contexts";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from "../store/constants";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Register = () => {
  const [state, dispatch] = useStateValue(stateContext);

  return (
    <form>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Password" />
      <button>Submit</button>
    </form>
  );
};

export default Register;
