import React from 'react';

import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

export const receivedColumns = [
    {
      name: "read",
      label: "Read",
      options: {
        filter: false,
        sort: false,
        download: false
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
        display: false,
        filter: false,
        download: false
      }
    },
    {
      name: "text",
      label: "Text",
      options: {
        display: false
      }
    },
    {
      name: "read",
      label: "Read",
      options: {
        display: false
      }
    }
  ];

export const sentColumns = [
    {
      name: "read",
      label: "Read",
      options: {
        filter: false,
        sort: false
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
    },
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
        filter: false,
        download: false
      }
    },
    {
      name: "text",
      label: "Text",
      options: {
        display: false
      }
    },
    {
      name: "read",
      label: "Read",
      options: {
        display: false
      }
    } 
];

export const timeRead = messages => {
    return messages.map(message => {
      if(message.timeRead === 0) {
        return (<RadioButtonUncheckedIcon />)
      } else {
        return (<RadioButtonCheckedIcon />)
      }
    });
  };

export const timeSent = messages => {
    return messages.map(message => {
      return message.timeSent;
    });
  };

export const title = messages => {
    return messages.map(message => {
      return message.title;
    });
  };

export const receiverName = messages => {
    return messages.map(message => {
      return `${message.receiverLastName}, ${message.receiverFirstName}`;
    });
  };

export const senderName = messages => {
    return messages.map(message => {
      return `${message.senderLastName}, ${message.senderFirstName}`;
    });
  };

export const messageId = messages => {
    return messages.map(message => {
      return message.messageId;
    });
  };

export const messageText = messages => {
    return messages.map(message => {
      return message.text;
    });
  };
