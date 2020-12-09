import React, {useContext, useEffect, useState} from "react";

import AccountServices from '../service/account-service';

const LS_TOKEN_KEY = 'token';

const AuthContext = React.createContext(
  {
    isAuth: false,
    token: '',
    userInfo: {},
    setToken: () => {
    },
    setUserInfo: () => {

    },
    login: (token, userInfo) => {
    },
    logout: () => {
    }
  }
);


const {Provider} = AuthContext;

export function AuthProvider({children}) {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  async function fetchUserInfo(token) {
    const userInfo = await AccountServices.getUserInfo(token);
    if (userInfo) {
      setUserInfo(userInfo);
      setToken(token);
      setIsAuth(true);
    } else {
      setToken(null);
      setUserInfo(null);
    }
  }

  function login(token, userInfo) {
    setToken(token);
    localStorage.setItem(LS_TOKEN_KEY, token);
    setUserInfo(userInfo);
    setIsAuth(true);
  }

  function logout() {
    localStorage.removeItem(LS_TOKEN_KEY);
    setUserInfo(null);
    setIsAuth(false);

  }

  useEffect(() => {
    const storageToken = localStorage.getItem(LS_TOKEN_KEY);
    fetchUserInfo(storageToken);
  }, []);

  return (
    <Provider value={{
      token: token,
      userInfo: userInfo,
      setToken: setToken,
      setUserInfo: setUserInfo,
      login: login,
      logout: logout
    }}>{children}</Provider>)
}

export const useAuth = () => useContext(AuthContext);
