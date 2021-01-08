import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory, useParams} from "react-router";
import AccountServices from "../../service/account-service";
import {CircularProgress} from "@material-ui/core";
import Template1 from "./Template1";
import validator from "../../service/data-validator";
import AlertDialog from "../dialog/AlertDialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterPage() {
  const {email, code} = useParams();
  const [password, setPassword] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Warning");
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    if (password.length === 0 || !validator.password(password)) {
      setTitle("Warning");
      setMessage("Password must have at least 8 characters includes: 1 letter, 1 number and 1 special character");
      setRedirect(false);
      return setOpen(true);
    }
    setInProgress(true);
    const response = await AccountServices.updatePassword(email, code, password);
    setInProgress(false);
    if (response.error) {
      setTitle("Warning");
      setMessage(response.message);
      setRedirect(false);
      setOpen(true);
    } else {
      setTitle("Information");
      setMessage("Update password successfully");
      setRedirect(true);
      setOpen(true);
    }
  }

  const childComponent = (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Update password
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="Email"
              label="Email"
              type="email"
              id="email"
              value={email}
              disabled
              onInput={e => setPassword(String(e.target.value))}
              onClick={() => setPassword('')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onInput={e => setPassword(String(e.target.value))}
              onClick={() => setPassword('')}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={inProgress}
          onClick={(e) => handleUpdatePassword(e)}
        >
          {inProgress ? <CircularProgress/> : "Update"}
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Template1 childComponent={childComponent}/>
      <AlertDialog open={open} title={title} content={message} handleClose={() => {
        setOpen(false);
        redirect && history.push("/login");
      }}/>
    </>
  );
}