import React from 'react';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import User from "./Menu/User";
import Anonymous from "./Menu/Anonymous";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles()(theme => ({
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    }
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  },
}))

const AppToolbar = () => {
  const { classes } = useStyles();
  const user = null;

  return (
    <>
      <AppBar position={'fixed'}>
        <ToastContainer/>
        <Toolbar>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <Typography variant="h6">
                <Link to='/' className={classes.mainLink}>
                  Chat
                </Link>
              </Typography>
            </Grid>

            <Grid item>
              {user ? <User user={user}/> : <Anonymous/>}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;