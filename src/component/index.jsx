import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Login from "./userAuthentication/LoginPage";
import {useAuth} from "./useAuth";
import HomePage from "./userAuthentication/HomePage";
import GameInfo from "./games/GameInfo";
import PlayerInfo from "./games/PlayerInfo";
import GameList from "./games/GamesList";
import UserList from "./userInfo/UserList";

export default function IndexComponent({props}) {

  const {isAuth} = useAuth();

  const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route
      {...rest}
      render={props => {
        if (auth === false)
          return <Redirect to='/login'/>;
        return <Component {...props}/>;
      }}
    />
  );

  const PrivateRoute1 = ({component: Component, auth, ...rest}) => (
    <Route {...rest} render={(props) => {
      if (auth === undefined)
        return <h2>Loading...</h2>
      if (auth === false)
        return <Redirect to='/login'/>;
      return <Component {...props}/>;
    }}/>
  )

  return (
    <Switch>
      <PrivateRoute1 exact path="/" auth={isAuth}>
        <HomePage/>
      </PrivateRoute1>
      <Route exact path="/login">
        {isAuth ? <Redirect to="/"/> : <Login/>}
      </Route>
      <PrivateRoute exact path="/game" auth={isAuth}>
        <GameList/>
      </PrivateRoute>
      <PrivateRoute path="/game/:gameId" auth={isAuth}>
        <GameInfo/>
      </PrivateRoute>
      <PrivateRoute exact path="/user" auth={isAuth}>
        <UserList/>
      </PrivateRoute>
      <PrivateRoute path="/user/:userId" auth={isAuth}>
        <PlayerInfo/>
      </PrivateRoute>
    </Switch>
  )
}
