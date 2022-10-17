import * as React from 'react';
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import {logoutUser} from "../../../../store/actions/usersActions";
import {Box, Typography} from "@mui/material";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();


    return (
      <Box sx={{display: 'flex'}}>
        <Typography variant='h6'>
          Welcome, {user.username}!
        </Typography>
        <Button onClick={() => dispatch(logoutUser())} sx={{color: 'inherit'}}>Logout</Button>
      </Box>
    );
};

export default UserMenu;