import React, { useEffect } from "react";
import { LinearProgress } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/CheckCircle";

const RegisterSuccess = props => {
  useEffect(() => {
    setTimeout(() => {
      props.history.push("/login");
    }, 2000);
  }, []);

  return (
    <>
      <LinearProgress />
      <br />
      <h1 style={{ marginTop: "2rem", fontSize: "2rem", textAlign: "center" }}>
        Account successfully registered!
      </h1>
    </>
  );
};

export default RegisterSuccess;
