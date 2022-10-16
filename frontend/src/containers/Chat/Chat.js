import React from 'react';
import {Grid} from "@mui/material";
import Users from "../../components/Users/Users";
import Messages from "../../components/Messages/Messages";

const Chat = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Users/>
      </Grid>
      <Messages/>
    </Grid>
  );
};

export default Chat;