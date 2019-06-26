import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import CalendarIcon from "@material-ui/icons/CalendarToday";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Container>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Menu
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <Link to="/my-bp/students">
            <ListItemText primary="Search Students" />
          </Link>
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <Link to="/my-bp/calendar">
            <ListItemText primary="My Calendar" />
          </Link>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link to="/my-bp/inbox">
            <ListItemText primary="Inbox" />
          </Link>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <Link to="/my-bp/send-message">
            <ListItemText primary="New Message" />
          </Link>
        </StyledMenuItem>
      </StyledMenu>
    </Container>
  );
};

export default Dashboard;
