import React, {useEffect, useRef, useState} from 'react';
import {Grid} from "@mui/material";
import Users from "../../components/Users/Users";
import Messages from "../../components/Messages/Messages";
import {useSelector} from "react-redux";

const Chat = ({history}) => {
  const ws = useRef(null);
  const user = useSelector(state => state.users.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  if(user === null) {
    history.push('/login');
  }

  useEffect(() => {
    if (user) {
      ws.current = new WebSocket('ws://localhost:8000/messages?token=' + user.token);

      ws.current.onmessage = event => {
        const newMessage = JSON.parse(event.data);
        console.log(newMessage);

        if(newMessage.type === 'CONNECTED') {
          setOnlineUsers(Object.keys(newMessage.onlineConnections).map(el => JSON.parse(el)));
          setMessages(newMessage.messages);
        }
      }
    }
  }, [user]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Users
          onlineUsers={onlineUsers}
        />
      </Grid>
      <Messages
        messages={messages}
      />
    </Grid>
  );
};

export default Chat;