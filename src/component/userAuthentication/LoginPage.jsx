// import React, {useState} from 'react';
// import {Box, Button, FormControl, Grid, Input, InputLabel, makeStyles, Typography} from '@material-ui/core';
// import {useHistory} from 'react-router-dom';
// import {useAuth} from "../useAuth";
// import AccountServices from "../../service/account-service";
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: 50,
//   },
//   title: {
//     color: '#283593',
//     fontWeight: "bold"
//   }
// }));
//
// export default function Login({props}) {
//   const classes = useStyles();
//   const {login} = useAuth();
//   const history = useHistory();
//
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [warningIsAppears, setWarningIsAppear] = useState(false);
//
//   const handleSubmitLogin = async (event) => {
//     event.preventDefault();
//
//     const response = await AccountServices.login(email, password);
//     if (response) {
//       login(response.token, response.userInfo);
//       history.replace('/');
//     } else {
//       setWarningIsAppear(true);
//     }
//   }
//
//   return (
//     <div className={classes.root}>
//       <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
//         <Grid item>
//           <Typography className={classes.title} variant="h4">
//             Login
//           </Typography>
//         </Grid>
//         <Grid item>
//           <form onSubmit={(e) => handleSubmitLogin(e)}>
//             <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
//               <Grid item>
//                 <FormControl>
//                   <Box width={350}>
//                     <InputLabel htmlFor="input-email">Email</InputLabel>
//                     <Input
//                       id="input-email"
//                       type="text"
//                       fullWidth
//                       value={email}
//                       onInput={e => setEmail(String(e.target.value))}
//                     />
//                   </Box>
//                 </FormControl>
//               </Grid>
//               <Grid item>
//                 <FormControl>
//                   <Box width={350}>
//                     <InputLabel htmlFor="input-password">Password</InputLabel>
//                     <Input
//                       id="input-password"
//                       type="password"
//                       fullWidth
//                       value={password}
//                       onInput={e => setPassword(String(e.target.value))}
//                     />
//                   </Box>
//                 </FormControl>
//               </Grid>
//               <Grid item>
//                 <Button type="submit">Login</Button>
//               </Grid>
//               <Grid item>
//                 <Box hidden={!warningIsAppears}>
//                   <Typography color={'secondary'}>
//                     Invalid email or password
//                   </Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           </form>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, CssBaseline, Grid, makeStyles, Paper, TextField} from "@material-ui/core";
import {Link} from 'react-router-dom';
import {useParams} from "react-router";
import {useAuth} from "../useAuth";
import AccountServices from "../../service/account-service";
import Typography from "@material-ui/core/Typography";
import AlertDialog from "../dialog/AlertDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://i.pinimg.com/originals/cf/f3/c3/cff3c344a4004018d65bf7911b0c48eb.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'left',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    paddingTop: "50px",
  },
}));

export default function LoginPage() {
  const {token} = useParams();
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (token !== undefined) {
      login(token);
    }
  }, [token]);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setMessage("Please enter email and password");
      return setOpen(true);
    }
    setInProgress(true);
    const response = await AccountServices.login(email, password);
    setInProgress(false);
    if (response) {
      if (response.error) {
        setMessage(response.message);
        setOpen(true);
      } else
        login(response.token, response.userInfo);
    }
  }

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline/>
        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        <Grid container direction="column" justify="center" item xs={12} sm={8} md={5} component={Paper} elevation={6}
              square>
          <Grid item>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate onSubmit={(e) => handleSubmitLogin(e)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onInput={e => setEmail(String(e.target.value))}
                  onClick={() => setEmail('')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={inProgress}
                >
                  {inProgress ? <CircularProgress/> : "Sign in"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/reset-password/get-code" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <AlertDialog open={open} title="Warning" content={message} handleClose={() => setOpen(false)}/>
    </div>
  );
}