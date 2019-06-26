import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "@material-ui/core";

const SendMessage = () => {
  return (
    <Container>
      <form>
        <input type="text" placeholder="Title/Subject" />
      </form>
    </Container>
  );
};

//Include a search field for list of students/mentors
//Large text-field for message text
//send functionality w/ POST request

export default SendMessage;
