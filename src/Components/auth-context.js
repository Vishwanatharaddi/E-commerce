import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  userEmail: "",
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return {
    token: storedToken,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(null);
  const [userEmail, setUseremail] = useState("");

  const logoutHandler = () => {
    setToken(null);
    setUseremail(null);
    localStorage.removeItem("token");
    // localStorage.removeItem("email");
    setUserIsLoggedIn(false);
    alert("Logged out succesfull");
  };

  //   const loginHandler = (token) => {
  //     setToken(token);
  //     localStorage.setItem("token", token);
  //     setUserIsLoggedIn(true);
  //   };

  const loginHandler = (token, email) => {
    setToken(token);
    setUseremail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUserIsLoggedIn(true);
  };

  useEffect(() => {
    if (token) {
      setUserIsLoggedIn(true);
    } else {
      setUserIsLoggedIn(false);
    }
  }, [token]);

  console.log(`user login hai ki nahi ${userIsLoggedIn}`);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userEmail: userEmail,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
