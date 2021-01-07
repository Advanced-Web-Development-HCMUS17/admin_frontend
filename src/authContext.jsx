import React, {useContext, useEffect, useState} from 'react';


const AuthContext = React.createContext(
  {
    token: '',
    isAuth: false,
    login: () => {
    },
    logout: () => {
    }
  }
);


const {Provider} = AuthContext;

function AuthProvider({children}) {

  const [token, setToken] = useState('');
  const [isAuth, setIsAuth] = useState(false);


  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    if (storageToken) {

    }
  }, []);

  function login(token) {
    setToken(token);
    setIsAuth(true);
  }

  function logout() {
    setToken('');
    setIsAuth(false);
  }

  return (<Provider value={{token, isAuth, login, logout}}>
    {children}
  </Provider>)
}

const useAuth = () => useContext(AuthContext);
