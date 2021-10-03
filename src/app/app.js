import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Pages } from "./route";
import { AppInit } from "./app_init";
import { AuthProvider, AuthStore } from "../auth/service";

import {ToastContainer,toast} from 'react-toastify'
// local store service
const authStore = AuthStore();
console.log("Auth Store: ", authStore);
function App() {
  return (
    
      <ThemeProvider theme={theme}>

      <CssBaseline />
      <AuthProvider store={authStore}>
        <AppInit>
          <Pages />
        </AppInit>
      </AuthProvider>
      <ToastContainer />
      </ThemeProvider>
  );
}

export default App;
