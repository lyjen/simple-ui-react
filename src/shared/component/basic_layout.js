// import { AppBar } from "@mui/material";
import { useAuthContext } from "../../auth/service/auth_context";
import { Footer } from "./footer";

export const BasicLayout = ({ children }) => {
  const { user } = useAuthContext();
  return (
    <div>
      {/* <AppBar>user: {user ? user.username : ""} </AppBar> */}
      <div>{children}</div>
      <Footer />
    </div>
  );
};
