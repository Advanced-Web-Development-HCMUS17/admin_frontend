import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Login from "./userAuthentication/LoginPage";
import {useAuth} from "./useAuth";
import HomePage from "./userAuthentication/HomePage";
import UserInfo from "./userInfo/UserInfo";

export default function IndexComponent({props}) {

  const {isAuth} = useAuth();
  return (
    <Switch>
      <Route exact path="/login">
        {
          !isAuth ?
            <Login/> :
            <Redirect to="/"/>
        }
      </Route>
      <Route path="/">
        {
          !isAuth ?
            <Redirect to="/login"/> :
            <HomePage/>
        }
      </Route>
    </Switch>
  )
}
