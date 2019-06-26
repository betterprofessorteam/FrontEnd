import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

const Dashboard = () => {
  return (
    <Container>
      <AppBar>
        <Link to="/my-bp/students">
          <Button>Search Students</Button>
        </Link>
      </AppBar>
    </Container>
  );
};

export default Dashboard;
