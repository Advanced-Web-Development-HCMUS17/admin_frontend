import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: 'url(https://www.ocregister.com/wp-content/uploads/2018/11/1118-REAL-BUCHANAN-BRADYBUNCH-1.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function Template1({childComponent}) {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" component="main" className={classes.root}>
      <Grid item>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Paper variant="elevation">
            {childComponent}
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
}