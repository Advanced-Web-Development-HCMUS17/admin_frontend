import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router";
import AccountServices from "../../service/account-service";
import {CircularProgress} from "@material-ui/core";
import Template1 from "./Template1";
import AlertDialog from "../dialog/AlertDialog";
import validator from "../../service/data-validator";

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
  const [email, setEmail] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Warning");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleSubmitButtonClick = async (event) => {
    event.preventDefault();
    if (email.length === 0 || !validator.email(email)) {
      setTitle("Warning");
      setMessage("Please input valid email");
      setRedirect(false);
      return setOpen(true);
    }
    setInProgress(true);
    const response = await AccountServices.resetPasswordRequest(email);
    setInProgress(false);
    if (response.error) {
      setTitle("Warning");
      setMessage(response.message);
      setRedirect(false);
      setOpen(true);
    } else {
      setTitle("Information");
      setMessage("A email was sent to " + email);
      setRedirect(true);
      setOpen(true);
    }
  }

  const childComponent = (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Reset password
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              autoFocus
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onInput={e => setEmail(String(e.target.value))}
              onClick={() => setEmail('')}
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
          onClick={(e) => handleSubmitButtonClick(e)}
        >
          {inProgress ? <CircularProgress/> : "Get email"}
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