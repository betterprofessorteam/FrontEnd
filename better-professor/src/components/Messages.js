import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { sentColumns, receivedColumns, timeRead, timeSent, title, receiverName, senderName, messageId, messageText, options } from './MessagesConstants';
import MUIDataTable from "mui-datatables";
import { LinearProgress, Button, FormGroup, Switch, Modal, Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Editor } from '@tinymce/tinymce-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: "none"
    }
  })
);

const Messages = props => {

  const [sentView, setSentView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sentMessageData, setSentMessageData] = useState([]);
  const [receivedMessageData, setReceivedMessageData] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [id, setId] = useState(0);
  const [read, setRead] = useState(false);

  const [open, setOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    sentView === false ? getReceivedMessages() : getSentMessages();
  }, [sentView]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const markAsRead = () => {
    axios
    .post(
      `https://better-professor.herokuapp.com/messages/${
        id
      }/read`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then(res => {
      console.log(res.data);
      window.location.reload();
    })
    .catch(err => {
      console.log(err.response);
      alert("Something went wrong");
    });
  }

  const getReceivedMessages = () => {
    axios
      .get("https://better-professor.herokuapp.com/messages/received", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: {
          size: 500
        }
      })
      .then(res => {
        const data = res.data.content.sort((a, b) => b.timeSent > a.timeSent ? 1 : b.timeSent === a.timeSent ? 1 : -1)

        const read = data.map(message => {
          return message.timeRead
        });
        const timesRead = timeRead(data);
        const timesSent = timeSent(data).map(date => {
          return moment(date).format("MMMM Do YYYY h:mm a");
        });
        const titles = title(data);
        const senderNames = senderName(data);
        const messageIds = messageId(data);
        const messageTexts = messageText(data);
        const receivedData = [];
        for (let i = 0; i < timesRead.length; i++) {
          receivedData.push([
            timesRead[i],
            timesSent[i],
            senderNames[i],
            titles[i],
            messageIds[i],
            messageTexts[i],
            read[i]
          ]);
        }
        setReceivedMessageData(receivedData);
        console.log("DATA:", data)
        setLoaded(true);
      })
      .catch(err => {
        console.log(err.response);
        // handleOpen();
      });
  };

  const getSentMessages = () => {
    axios
      .get("https://better-professor.herokuapp.com/messages/sent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: {
          size: 500
        }
      })
      .then(res => {
        const data = res.data.content.sort((a, b) => b.timeSent > a.timeSent ? 1 : b.timeSent === a.timeSent ? 1 : -1)
        const read = data.map(message => {
          return message.timeRead
        });
        const timesRead = timeRead(data);
        const timesSent = timeSent(data).map(date => {
          return moment(date).format("MMMM Do YYYY");
        });
        const titles = title(data);
        const receiverNames = receiverName(data);
        const messageIds = messageId(data);
        const messageTexts = messageText(data);
        const sentData = [];
        for (let i = 0; i < timesRead.length; i++) {
          sentData.push([
            timesRead[i],
            timesSent[i],
            receiverNames[i],
            titles[i],
            messageIds[i],
            messageTexts[i],
            read[i]
          ]);
        }
        setSentMessageData(sentData);
      
        setLoaded(true);
      })
      .catch(err => {
        console.log(err.response);
        // handleOpen();
      });
  };

  const options = {
    textLabels: {
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Messages"
      }
    },
    downloadOptions: {filename: "BetterProfessorMessages.csv"},
    viewColumns: false,
    filter: false,
    rowsPerPageOptions: [10, 50, 100],
    downloadOptions: { filename: "BetterProfessorMessages.csv" },
    onRowsDelete: row => {
      const messageId = receivedMessageData[row.data[0].index][4];
      axios
        .delete(
          `https://better-professor.herokuapp.com/messages/${messageId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        .then(res => {
          window.location.reload();
        })
        .catch(console.error);
      console.log("DELETING: --- ", row);
    },
    onRowClick: row => {
      handleOpen();
      setMessageBody(row[5]);
      setId(row[4]);
      row[6] === 0 ? setRead(false) : setRead(true);
      console.log(row)
    }
  };

  return (
    <div style={{ marginTop: "6rem" }}>
      {loaded === false ? (<><h1>Loading...</h1><LinearProgress/></>) : 
     <>
     <MUIDataTable
     title={(<FormGroup row="true">
     <p>Inbox</p>
     <Switch
       onChange={() => {
         setLoaded(false);
         if (sentView === false) {
           setSentView(true);
           setLoaded(true);
         } else {
           setSentView(false);
           setLoaded(true);
         }
       }}
       color="default"
     />
     <p>Sent Messages</p>
   </FormGroup>)}
     data={sentView === false ? receivedMessageData : sentMessageData}
     columns={sentView === false ? receivedColumns : sentColumns}
     options={options}
   />
   <Modal
   aria-labelledby="modal-title"
   aria-describedby="modal-description"
   open={open}
   onClose={handleClose}
   >
     <div style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} className={classes.paper}>
       <Typography variant="h6" id="modal-title">Message Body:</Typography>
       <Editor
       apiKey="seoqyye0f5vweemq7gcxskx8x7zmkspyyeszg1l46c7bzxiv"
       init={{ toolbar: false, menubar: false, elementpath: false, statusbar:false }}
       value={messageBody}
       disabled />
       {sentView === false && read === false ? (<Button onClick={e => {
         e.preventDefault();
         markAsRead();
       }}>Mark as Read</Button>) : ""}
     </div>
   </Modal>
   </>
    }
     
    </div>
  );
};

export default Messages;
