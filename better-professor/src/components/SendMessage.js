import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  TextField,
  InputLabel,
  Select
} from "@material-ui/core";

const SendMessage = () => {
  return (
    <Container>
      <form>
        <TextField type="text" placeholder="Title/Subject" variant="outlined" />

        <InputLabel>Send To</InputLabel>
        <Select multiple />
        <TextField
          label="Message Body"
          variant="outlined"
          multiline
          fullWidth
          margin="normal"
        />
      </form>
    </Container>
  );
};

//Include a search field for list of students/mentors
//Large text-field for message text
//send functionality w/ POST request

export default SendMessage;
