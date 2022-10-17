import React from 'react';
import {Box, Button, Card, Grid, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";

const Messages = ({messages}) => {
  console.log(messages)
  const user = useSelector(state => state.users.user);

  let messageStyle = 'flex-start';


  return (
    <Grid  item xs={8}>
      <Grid container direction='column'>
        <Grid item xs={10}>
          <Card elevation={12}  sx={{marginBottom: '25px', padding: '10px'}}>
            <Typography variant='h5'>
              Chat room
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'flex-start', background: 'lightgrey', padding: '7px', borderRadius: '15px'}}>
              {messages && messages.map(message =>
              {
                if(user.username === message.user.username) {
                  messageStyle = 'flex-end'
                } else {messageStyle = 'flex-start'}
                return (
                  <Card sx={{border: '1px solid grey', marginTop: '10px', padding: '5px', alignSelf: messageStyle}} >
                    <strong>{message.user.username}</strong>: {message.text}
                  </Card>
                )
              }
              )}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card elevation={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <TextField label='Enter message' variant='outlined' sx={{width: '80%'}} size='small'/>
            <Button variant="contained">
              Send
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Messages;