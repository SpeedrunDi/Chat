import React from 'react';
import {Button, Card, Grid, TextField, Typography} from "@mui/material";

const Messages = () => {
  return (
    <Grid  item xs={8}>
      <Grid container direction='column'>
        <Grid item xs={10}>
          <Card elevation={12}  sx={{marginBottom: '25px'}}>
            <Typography variant='h5'>
              Chat room
            </Typography>
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