import React, { createContext, useContext, useReducer } from "react";
import { ROUTES } from "utils/routes";

const AuthContext = createContext(null);

const intitailState = {
  token: "",
  user: {
    name: "",
    emailId: "",
    userId: "",
    photo: "",
  },
};

const UserAuthReducer = (state, action) => {
  if (action.type === "userauth") {
    var user = {
      name: action.name,
      emailId: action.emailId,
      userId: action.userId,
      photo: action.photo,
    };
    localStorage.setItem(ROUTES.VAR_ENCODE_TOKEN, JSON.stringify({ token: action.token, user: user }))
    return { token: action.token, user: user };
  } else if (action.type === "reset") {
    console.log("Reset")
    localStorage.removeItem(ROUTES.VAR_ENCODE_TOKEN);
    return intitailState;
  }

  return state;
};

const AuthProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(
    UserAuthReducer,
    JSON.parse(localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN)) ?? intitailState
  );

  return (
    <AuthContext.Provider value={{ userState, userDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };