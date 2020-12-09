import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Login from "./userAuthentication/LoginPage";
import Home from "./userAuthentication/HomePage";
import {useAuth} from "./useAuth";

export default function IndexComponent({props}) {

  const {userInfo} = useAuth();
  return (
    <Switch>

      <Route exact path="/login">
        {
          !userInfo || JSON.stringify(userInfo) === '{}' ?
            <Login/> :
            <Redirect to="/"/>
        }
      </Route>

      <Route exact path="/">
        {
          !userInfo || JSON.stringify(userInfo) === '{}' ?
            <Redirect to="/login"/> :
            <Home userInfo={userInfo}/>
        }
      </Route>
    </Switch>
  )
}
