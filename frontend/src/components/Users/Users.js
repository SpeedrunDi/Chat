import React from 'react';
import {Box, Card, Typography} from "@mui/material";

const Users = ({onlineUsers}) => {
  console.log(onlineUsers)
  return (
    <Card elevation={12}>
      <Typography variant='h5'>
        Online users
      </Typography>
      {onlineUsers && onlineUsers.map(el => (
        <Box key={el.id}>
          {el.username}
        </Box>
      ))

      }
    </Card>
  );
};

export default Users;