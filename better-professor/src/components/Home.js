import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

const Home = () => {
  return (
    <Container>
      <AppBar>
        <h1>Better Professor App</h1>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </AppBar>
    </Container>
  );
};

export default Home;
