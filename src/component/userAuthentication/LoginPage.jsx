import React, {useState} from 'react';
import {Box, Button, FormControl, Grid, Input, InputLabel, makeStyles, Typography} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {useAuth} from "../useAuth";
import AccountServices from "../../service/account-service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 50,
  },
  title: {
    color: '#283593',
    fontWeight: "bold"
  }
}));

export default function Login({props}) {
  const classes = useStyles();
  const {login} = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warningIsAppears, setWarningIsAppear] = useState(false);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const response = await AccountServices.login(email, password);
    if (response) {
      login(response.token, response.userInfo);
      history.replace('/');
    } else {
      setWarningIsAppear(true);
    }
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <Typography className={classes.title} variant="h4">
            Login
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={(e) => handleSubmitLogin(e)}>
            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <FormControl>
                  <Box width={350}>
                    <InputLabel htmlFor="input-email">Email</InputLabel>
                    <Input
                      id="input-email"
                      type="text"
                      fullWidth
                      value={email}
                      onInput={e => setEmail(String(e.target.value))}
                    />
                  </Box>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <Box width={350}>
                    <InputLabel htmlFor="input-password">Password</InputLabel>
                    <Input
                      id="input-password"
                      type="password"
                      fullWidth
                      value={password}
                      onInput={e => setPassword(String(e.target.value))}
                    />
                  </Box>
                </FormControl>
              </Grid>
              <Grid item>
                <Button type="submit">Login</Button>
              </Grid>
              <Grid item>
                <Box hidden={!warningIsAppears}>
                  <Typography color={'secondary'}>
                    Invalid email or password
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
