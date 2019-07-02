import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import MUIDataTable from "mui-datatables";

const Fun = props => {
  const receivedColumns = [
    {
      name: "read",
      label: "Read",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "from",
      label: "From",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "id",
      label: "ID",
      options: {
        display: false
      }
    }
  ];

  const sentColumns = [
    {
      name: "read",
      label: "Read",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "to",
      label: "To",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true
      }
    }
  ];

  const [sentView, setSentView] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [sentMessageData, setSentMessageData] = useState([]);
  const [receivedMessageData, setReceivedMessageData] = useState([]);

  useEffect(() => {
    sentView === false ? getReceivedMessages() : getSentMessages();
  }, [sentView]);

  const timeRead = messages => {
    return messages.map(message => {
      return message.timeRead;
    });
  };

  const timeSent = messages => {
    return messages.map(message => {
      return message.timeSent;
    });
  };

  const title = messages => {
    return messages.map(message => {
      return message.title;
    });
  };

  const receiverName = messages => {
    return messages.map(message => {
      return `${message.receiverLastName}, ${message.receiverFirstName}`;
    });
  };

  const senderName = messages => {
    return messages.map(message => {
      return `${message.senderLastName}, ${message.senderFirstName}`;
    });
  };

  const messageId = messages => {
    return messages.map(message => {
      return message.messageId;
    });
  };

  const getReceivedMessages = () => {
    axios
      .get("https://better-professor.herokuapp.com/messages/received", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        const timesRead = timeRead(res.data.content);

        const timesSent = timeSent(res.data.content).map(date => {
          return moment(date).format("MMMM Do YYYY h:mm a");
        });
        const titles = title(res.data.content);
        const senderNames = senderName(res.data.content);
        const messageIds = messageId(res.data.content);
        const receivedData = [];
        for (let i = 0; i < timesRead.length; i++) {
          receivedData.push([
            timesRead[i],
            timesSent[i],
            senderNames[i],
            titles[i],
            messageIds[i]
          ]);
        }
        setReceivedMessageData(receivedData);
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
        }
      })
      .then(res => {
        const timesRead = timeRead(res.data.content).map(date => {
          return moment(date).format("MMMM Do YYYY");
        });
        const timesSent = timeSent(res.data.content);
        const titles = title(res.data.content);
        const receiverNames = receiverName(res.data.content);
        const messageIds = messageId(res.data.content);
        const sentData = [];
        for (let i = 0; i < timesRead.length; i++) {
          sentData.push([
            timesRead[i],
            timesSent[i],
            receiverNames[i],
            titles[i],
            messageIds[i]
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
      },
      filter: {
        all: "All",
        title: "FILTERS",
        reset: "RESET FILTERS"
      }
    },
    onRowsDelete: row => {
      const messageId = receivedMessageData[row.data[0].index][4];
      console.log(messageId);
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
          console.log(res);
        })
        .catch(console.error);
      console.log("DELETING: --- ", row);
    },
    // function(rowsDeleted: object(lookup: {dataindex: boolean}, data: arrayOfObjects: {index, dataIndex})) => false,
    // rowsPerPageOptions: [20],
    // downloadOptions: {
    //   filename: "receivedMessagesDownload.csv",
    //   separator: ","
    // },
    onRowClick: function() {
      console.log("im clickingggggg");
    }
  };

  return (
    <div style={{ marginTop: "6rem" }}>
      <MUIDataTable
        title={"Inbox"}
        data={receivedMessageData}
        columns={receivedColumns}
        options={options}
      />
    </div>
  );
};

export default Fun;
