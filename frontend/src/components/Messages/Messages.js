import React from 'react';
import {Box, Button, Card, Grid, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useSelector} from "react-redux";



const Messages = ({messages, reconnect, deleteMessage}) => {
  const user = useSelector(state => state.users.user);

  let messageStyle = 'flex-start';


  return (
    <Grid  item xs={8}>
      <Grid container direction='column'>
        <Grid item xs={10}>
          <Card elevation={12}  sx={{marginBottom: '25px', padding: '10px'}}>
            <Typography variant='h5'>
              Chat room
              {reconnect && <Typography variant="span" marginLeft="30px" fontSize="12px">connection...</Typography>}
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'flex-start', background: 'lightgrey', padding: '7px', borderRadius: '15px'}}>
              {messages && messages.map(message =>
              {
                if(user && user.username === message.user.username) {
                  messageStyle = 'flex-end'
                } else {messageStyle = 'flex-start'}
                return (
                    <Card
                      key={message._id}
                      sx={{border: '1px solid grey', marginTop: '10px', padding: '7px 25px 7px 7px', alignSelf: messageStyle, position: 'relative'}}
                    >
                      <strong>{message.user.username}</strong>: {message.text}
                      {user && user.role === 'admin'
                        ? <Button onClick={() => deleteMessage(message._id)} aria-label="delete" size='small' sx={{position: 'absolute', top: '-8px', right: '-26px'}}>
                            X
                          </Button>
                        : null
                      }
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
            <Button variant="contained"  endIcon={<SendIcon/>}>
              Send
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Messages;