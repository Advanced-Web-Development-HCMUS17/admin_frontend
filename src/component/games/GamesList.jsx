import React, {useEffect, useState} from "react";
import {useAuth} from "../useAuth";
import {fetchGames} from "../../service/api";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {NavLink} from "react-router-dom";
import TableBody from "@material-ui/core/TableBody";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";

export default function GameList(props) {

  const [games, setGames] = useState([]);
  const {token} = useAuth();
  const [page, setPage] = useState(1);

  async function fetchData() {
    const games = await fetchGames(token, page);
    console.log(games);
    setGames(games);
  }

  useEffect(() => {
      fetchData()
    }
    , [page]);
  return (<>
    <Typography variant={"h5"}>
      Games
    </Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Player 1</TableCell>
          <TableCell>Player 2</TableCell>
          <TableCell>Timestamp</TableCell>
          <TableCell>Winner</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game._id}>
            <TableCell><NavLink to={`/game/${game._id}`}>{game._id}</NavLink></TableCell>
            <TableCell>{game.user1.username}</TableCell>
            <TableCell>{game.user2.username}</TableCell>
            <TableCell>{game.date}</TableCell>
            <TableCell>{game.winner}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Pagination count={10} page={page} onChange={async (event, page) => {
      setPage(page);
    }}
                color="primary"/>
  </>);
}
