import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../auth/service/auth_context";

// process all initialization
export const AppInit = ({ children }) => {
  const [initialized, setInit] = useState(false);
  const { authInit } = useAuthContext();

  const appInit = useCallback(async () => {
    await authInit();
    setInit(true);
  }, []);

  useEffect(() => {
    appInit();
  }, []);

  if (!initialized) {
    return null;
  }

  return children;
};
