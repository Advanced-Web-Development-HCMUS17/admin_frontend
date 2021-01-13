import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {fetchGameInfo, fetchGames} from "../../service/api";
import {useAuth} from "../useAuth";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Grid from "@material-ui/core/Grid";
import PlayerInfo from "./PlayerInfo";
import Box from "@material-ui/core/Box";
import ChatLog from "./chat/ChatLog";
import Typography from "@material-ui/core/Typography";

export default function GameInfo() {

  const {gameId} = useParams();

  const [gameInfo, setGameInfo] = useState(null);
  const {token} = useAuth();

  async function fetchData() {
    let data = await fetchGameInfo(token, gameId);
    let dateFormat = new Date(data.date);
    data.date = dateFormat.toLocaleString("en-US");
    setGameInfo(data);
  }

  useEffect(() => {
      fetchData();
    }
    , [gameId]);
  return (gameInfo ? <>
      <Grid item><AccessTimeIcon/> {gameInfo.date}</Grid>
      <Grid container>
        <Grid item md={9}>
          GameHistory
        </Grid>
        <Grid item md={3}>
          <Box py={2}>
            Player 1
            <PlayerInfo name={gameInfo.user1} id={gameInfo.user1._id} email={gameInfo.user1.email}
                        rating={gameInfo.user1.rating}/>
          </Box>
          <Box py={2}>Player 2
            <PlayerInfo name={gameInfo.user2} id={gameInfo.user1._id} email={gameInfo.user2.email}
                        rating={gameInfo.user2.rating}/></Box>
        </Grid>
      </Grid>
      <Grid>
        <Typography variant={"h6"}>Chat log</Typography>
        {JSON.stringify(gameInfo.chat)}
        <ChatLog chats={gameInfo.chat ? gameInfo.chat : []}/>
      </Grid>
    </> : <CircularProgress color="secondary"/>
  )
}
