import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {Container, Grid} from "@material-ui/core";
import {changeUserRole, getGamesByUserId, getUserInfo} from "../../service/api";
import {useAuth} from "../useAuth";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "react-router-dom/Link";
import Table from "@material-ui/core/Table";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import StarsOutlinedIcon from '@material-ui/icons/StarsOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
  BANNED: "BANNED"
}

export default function UserInfo() {
  const {userId} = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const {token} = useAuth();
  const [games, setGames] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSB, setOpenSB] = React.useState(false);
  const [choosingRole, setChoosingRole] = useState(ROLE.USER);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setChoosingRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseSB = () => {
    setOpenSB(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenSB = () => {
    setOpenSB(true);
  };

  async function fetchUserInfo() {
    const [userInfo, games] = await Promise.all([getUserInfo(token, userId), getGamesByUserId(token, userId)]);
    setUserInfo(userInfo);
    setChoosingRole(userInfo.role ? userInfo.role : undefined);
    setGames(games);
  }

  const handleChangeRole = async () => {
    const res = await changeUserRole(token, userId, choosingRole);
    if (res) {
      setMessage("Success");
    } else {
      setMessage('Failed');
    }
    handleOpenSB();
    fetchUserInfo();
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (<Container maxWidth={"lg"}>
    <Grid container alignItems={"flex-end"} direction={"row"} spacing={3}>
      {userInfo ? (
          <><Grid item>
            <Typography color={"textPrimary"} variant={"h4"}><AccountBoxOutlinedIcon color={"primary"}/> <strong>{userInfo.username}</strong></Typography>
          </Grid>
            <Grid item><Typography variant={"p"}><AlternateEmailOutlinedIcon color={"primary"}/>Email: {userInfo.email}</Typography></Grid>
            <Grid item><Typography variant={"p"}><StarsOutlinedIcon color={"primary"}/>Rating: {userInfo.rating}</Typography></Grid>
            <Grid item><FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">Role</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={choosingRole}
                onChange={handleChange}
              >
                <MenuItem value={ROLE.BANNED}>Banned</MenuItem>
                <MenuItem value={ROLE.ADMIN}>Admin</MenuItem>
                <MenuItem value={ROLE.USER}>User</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item><Button color={"secondary"} onClick={handleChangeRole} variant={"contained"}
                               disabled={choosingRole === userInfo.role}>Save</Button></Grid>
          </>
        )
        : <LinearProgress color="secondary"/>
      }
    </Grid>
    <Grid container direction={"row"} spacing={3}>
      {games ? (
          <>
            <Typography variant={"h6"}>
              Played games
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>GameId</TableCell>
                  <TableCell>Player 1</TableCell>
                  <TableCell>Player 2</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Winner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {games.map((game) => (
                  <TableRow key={game._id}>
                    <TableCell>{game._id}</TableCell>
                    <TableCell><Link to={`/user/${game.user1._id}`}>{game.user1.username}</Link></TableCell>
                    <TableCell><Link to={`/user/${game.user2._id}`}>{game.user2.email}</Link></TableCell>
                    <TableCell>{game.winner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )
        : <LinearProgress color="secondary"/>
      }
    </Grid>
    <Snackbar open={openSB} autoHideDuration={6000} onClose={handleCloseSB}>
      <Alert onClose={handleCloseSB} severity={"info"}>
        {message}
      </Alert>
    </Snackbar>
  </Container>);
}
