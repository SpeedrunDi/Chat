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

  const [reconnect, setReconnect] = useState(false);

  useEffect(() => {
    if (user) {
      const connect = () => {
        ws.current = new WebSocket('ws://localhost:8000/messages?token=' + user.token);

        ws.current.onmessage = event => {
          const newMessage = JSON.parse(event.data);
          console.log(newMessage);

          if(newMessage.type === 'CONNECTED') {
            setOnlineUsers(Object.keys(newMessage.onlineConnections).map(el => JSON.parse(el)));
            setMessages(newMessage.messages);
          }

          if(newMessage.type === 'UPDATE_MESSAGES') {
            setMessages(newMessage.messages);
          }
        };

        ws.current.onclose = () => {
          console.log('disconnected');
          setReconnect(true);

          setTimeout(() => {
            connect();
            setReconnect(false);
          }, 3000);
        };
      };

      connect();
    }
  }, [user]);

  const deleteMessage = id => {
    ws.current.send(JSON.stringify({
      type: 'DELETE_MESSAGE',
      messageId: id
    }));

  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Users
          onlineUsers={onlineUsers}
        />
      </Grid>
      <Messages
        messages={messages}
        reconnect={reconnect}
        deleteMessage={deleteMessage}
      />
    </Grid>
  );
};

export default Chat;