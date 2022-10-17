import React, {useEffect, useRef, useState} from 'react';
import {Grid} from "@mui/material";
import Users from "../../components/Users/Users";
import Messages from "../../components/Messages/Messages";
import {useSelector} from "react-redux";

const Chat = () => {
  const ws = useRef(null);
  const user = useSelector(state => state.users.user);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    console.log(user)
    ws.current = new WebSocket('ws://localhost:8000/messages?token=' + user.token);

    ws.current.onmessage = event => {
      const newMessage = JSON.parse(event.data);
      console.log(Object.keys(newMessage.onlineConnections));

      if(newMessage.type === 'CONNECTED') {
        setOnlineUsers(Object.keys(newMessage.onlineConnections).map(el => JSON.parse(el)))
      }
    }
  }, [])

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Users
          onlineUsers={onlineUsers}
        />
      </Grid>
      <Messages/>
    </Grid>
  );
};

export default Chat;