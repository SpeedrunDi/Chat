import React, {useState} from 'react';
import {
  Box,
  Button,
  Card, CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../store/actions/usersActions";

const Messages = ({messages, reconnect, deleteMessage, sendMessage}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const users = useSelector(state => state.users.users);
  const usersLoading = useSelector(state => state.users.usersLoading);

  const [messageText, setMessageText] = useState('');
  const [userId, setUserId] = useState('');

  let messageStyle = 'flex-start';

  const onGetUsersForMessage = () => {
    dispatch(getUsers());
  };

  return (
    <Grid  item xs={8}>
      <Grid container direction='column'>
        <Grid item xs={10}>
          <Card elevation={12}  sx={{marginBottom: '25px', padding: '10px'}}>
            <Grid container alignItems="center" paddingY="5px">
              <Grid item xs={8}>
                <Typography variant='h5'>
                  Chat room
                  {reconnect &&
                    <Typography variant="span" marginLeft="30px" fontSize="15px">
                      connection... <CircularProgress size="10px"/>
                    </Typography>
                  }
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="select-user">Select user</InputLabel>
                  <Select
                    variant="filled"
                    labelId="select-user"
                    name="user"
                    value={userId}
                    label="Select user"
                    onOpen={onGetUsersForMessage}
                    onChange={e => setUserId(e.target.value)}
                  >
                    {users.length !== 0 ?
                      <MenuItem value="">
                        Cancel
                      </MenuItem>
                      : <MenuItem value="">
                        no users
                      </MenuItem>
                    }
                    {users && users.length !== 0 && users.map(user => (
                      <MenuItem key={user._id} value={user._id}>
                        {user.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {usersLoading && <LinearProgress/>}
              </Grid>
            </Grid>
            <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'flex-start', background: 'lightgrey', padding: '7px', borderRadius: '15px'}}>
              {messages && messages.map(message =>
              {
                if(user && user.username === message.user.username) {
                  messageStyle = 'flex-end'
                } else  {messageStyle = 'flex-start'}
                return (
                    <Card
                      key={message._id + 'card'}
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
            <TextField
                label='Enter message'
                variant='outlined'
                sx={{width: '80%'}}
                size='small'
                value={messageText}
                name='message'
                onChange={e => setMessageText(e.target.value)}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon/>}
              onClick={() => [sendMessage(messageText, userId), setMessageText(''), setUserId('')]}
            >
              Send
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Messages;