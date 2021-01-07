import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {useAuth} from "./useAuth";
import Login from "./userAuthentication/LoginPage";
import HomePage from "./userAuthentication/HomePage";
import GameInfo from "./games/GameInfo";
import GameList from "./games/GamesList";
import UserList from "./userInfo/UserList";
import UserInfo from "./userInfo/UserInfo";
import {LinearProgress} from "@material-ui/core";

const PrivateRoute = ({component: Component, auth: isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => {
    if (isAuthenticated === null)
      return <LinearProgress/>
    if (isAuthenticated === true)
      return <Component {...props}/>;
    return <Redirect to="/login"/>;
  }}/>
)

export default function IndexComponent({props}) {
  const {isAuth} = useAuth();
  console.log(isAuth);
  return (
    <Switch>
      <PrivateRoute exact path="/" auth={isAuth} component={HomePage}/>
      <Route exact path="/login">{isAuth ? <Redirect to="/"/> : <Login/>}</Route>
      <PrivateRoute exact path="/game" auth={isAuth} component={GameList}/>
      <PrivateRoute path="/game/:gameId" auth={isAuth} component={GameInfo}/>
      <PrivateRoute exact path="/user" auth={isAuth} component={UserList}/>
      <PrivateRoute path="/user/:userId" auth={isAuth} component={UserInfo}/>
    </Switch>
  )
}