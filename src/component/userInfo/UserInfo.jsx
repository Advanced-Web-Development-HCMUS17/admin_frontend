import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {Container, Grid} from "@material-ui/core";
import {getGamesByUserId, getUserInfo} from "../../service/api";
import {useAuth} from "../useAuth";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "react-router-dom/Link";
import Table from "@material-ui/core/Table";

export default function UserInfo() {
  const {userId} = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const {token} = useAuth();
  const [games, setGames] = useState([]);

  async function fetchUserInfo() {
    const [userInfo, games] = await Promise.all([getUserInfo(token, userId), getGamesByUserId(token, userId)]);
    setUserInfo(userInfo);
    setGames(games);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (<Container maxWidth={"lg"}>
    <Grid container direction={"row"} spacing={3}>
      {userInfo ? (
          <><Grid item>
            <Typography variant={"h4"}>{userInfo.username}</Typography>
          </Grid>
            <Grid item><Typography variant={"p"}>Email: {userInfo.email}</Typography></Grid>
            <Grid item><Typography variant={"p"}>Rating: {userInfo.rating}</Typography></Grid>
            <Grid item><Typography variant={"p"}>Role: {userInfo.role}</Typography></Grid></>
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
  </Container>);
}
