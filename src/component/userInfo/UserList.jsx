import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Typography} from "@material-ui/core";
import {useAuth} from "../useAuth";
import {fetchUserList, searchUser} from "../../service/api";
import Link from "react-router-dom/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function UserList() {

  const {token} = useAuth();

  const [users, setUsers] = useState([]);

  const [keyword, setKeyword] = useState('');

  const [pageIndex, setPageIndex] = useState(1);

  async function fetchData() {
    const data = await fetchUserList(token, pageIndex);
    setUsers(data);
  }

  useEffect(() => {
    fetchData();
  }, [token, pageIndex]);

  async function handleSearch() {
    const users = await searchUser(token, keyword);
    setUsers(users);
  }

  return (
    <React.Fragment>
      <Typography variant={"h5"}>User list</Typography>
      <TextField id="outlined-basic" label="Search by username or email" value={keyword}
                 onChange={e => setKeyword(e.target.value)} variant="outlined"/>
      <Button onClick={handleSearch}>Search</Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell><Link to={`/user/${user._id}`}>{user.username}</Link></TableCell>
              <TableCell><Link to={`/user/${user._id}`}>{user.email}</Link></TableCell>
              <TableCell>{user.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination count={10} page={pageIndex} onChange={async (event, page) => {
        setPageIndex(page);
      }}
                  color="primary"/>
    </React.Fragment>
  );
}
