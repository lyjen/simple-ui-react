import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  const { authInit, login, logout, isLogged, register, user, token } =
    useContext(AuthContext);

  // for property backreading
  return { authInit, login, logout, isLogged, register, user, token };
};