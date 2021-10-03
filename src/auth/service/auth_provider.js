import { useCallback, useMemo, useState } from "react";
import request from "umi-request";

import { encryptText, getUserData } from "../../utils/utils";
import { Config } from "../../app/global";
import { AuthContext } from "./auth_context";
import { toast } from 'react-toastify';

export const AuthProvider = ({ children, store }) => {
  const value = useAuthProviderHandler(store);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// isolation for unit testing
export const useAuthProviderHandler = (store, defaultValue = {}) => {
  const [state, setState] = useState({
    token: null,
    user: null,
    expireAt: null,
    error: null,
    loading: false,
    ...defaultValue,
  });

  const login = useCallback(
    async (data, onSuccess, onFailure) => {

      try {
        // process login
        setState((store) => ({ ...store, loading: true }));

        const params = {
          email: data.data.email,
          password: encryptText(data.data.password),
        };

        const response = await request(
          `${Config.API}/user/login`,
          { method: "POST", data: params },
          true
        );

        console.log("Logging in: ", params, "Response:",  response);

        if (response.status === "ok") {

          const result = response.data
          setState((store) => ({
            ...store,
            user: { username: result.username, id: result.id },
            token: result.token,
            expireAt: result.refresh_token_expire_date,
            loading: false,
            error: null,
          }));

          store.save(response);
          localStorage.setItem('username', result.username);
          localStorage.setItem('token', result.token);
          if (onSuccess) {
            onSuccess();
          }
        }else{

          console.log("Invalid");
          toast(response.alert);          
          window.location.href = '/auth/login';

        }

      } catch (e) {
        setState((store) => ({
          ...store,
          loading: false,
          error: "failed to login",
        }));
        if (onFailure) {
          onFailure();
        }
      }
    },
    [setState]
  );

  const logout = useCallback(
    async (data, onSuccess) => {
      // process logout
      console.log("Logout", data);
      const headers = {
        token: data.token,
        userid: data.user.id,
      }
      console.log("Params", headers);
      const response = await request(
        `${Config.API}/user/logout`,
        { method: "POST", headers: headers },
        true
      );

      console.log("Logout Status", response);
      if (response.status === "ok") {

        setState((store) => ({
          ...store,
          user: null,
          token: null,
          expireAt: null,
          error: null,
        }));
        store.save({});

        localStorage.clear();
        window.location.href = '/auth/login';

      } else {
        // toast(response.alert);
        window.location.href = '/auth/login';
      }
  
      if (onSuccess) {
        onSuccess();
      }
    },
    [setState]
  );

  const register = useCallback(
    
    async (data) => {
    // process register

    const params = {
      email: data.email,
      password: data.password,
      username: data.userName,
      first_name: data.firstName,
      last_name: data.lastName
    }

    const response = await request(`${Config.API}/register`, { method: "POST", data: params }, true);
    console.log("Response: ", response);

    if (response.status === "ok") {
        toast(response.message);

    } else {
      toast(response.alert);
      // window.location.href = '/auth/register';
    }

  }, [state]);

  const isLogged = useCallback(() => {
    // todo :validate token using expireAt
    const token_expire_date = state.refresh_token_expire_date;
    // console.log("Token Expiration: ", token_expire_date, "State Token: ", state.token)
    return Boolean(state.token);
  }, [state]);

  const authInit = useCallback(async () => {
    console.log("app init");
    const authData = await store.getItem();
    if (!authData) {
      return;
    }
    setState({
      user: authData.username || null,
      token: authData.token || null,
      expireAt: authData.expireAt || null,
    });
  }, [setState]);

  return useMemo(
    () => ({
      authInit,
      login,
      logout,
      isLogged,
      register,
      token: state.token,
      user: state.user,
    }),
    [authInit, login, logout, isLogged, register, state]
  );
};