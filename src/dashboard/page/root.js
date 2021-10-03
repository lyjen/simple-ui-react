import * as React from 'react';
import * as styledComponents from "styled-components";
import { Button, Divider, Typography, Box, Container, Grid, Link, TextField} from "@mui/material";
import { NavLink } from 'react-router-dom';
import { useCallback } from "react";
import { useHistory } from "react-router";
import { AppPaths } from "../../app/path";
import { userProfile } from "../../auth/service/common";
import { useAuthContext } from "../../auth/service/auth_context";
import  {useState } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../component/listItems';

// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
export const RootPage = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const { user, token, logout, isLogged} = useAuthContext();

//   if (!isLogged()) {
//     history.push(AppPaths.auth.login);
// }
  const onLogout = useCallback(() => {
    // logout({user, token}, () => history.push(AppPaths.auth.login));
    logout({user, token});
  }, [history, logout]);

  const showUserInfo = () => {
      // call userProfile API
      setUserInfo(userProfile(user, token));
  };

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

  return (
      <ThemeProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Grid>
                {/* 
                <ListItem button>
                <ListItemIcon>
                <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
                </ListItem> */}

                <Button onClick={onLogout} variant="contained" ><LogoutIcon />Logout</Button>
              </Grid>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            {/* <ListItem component={NavLink} to="/dashboard/profile" button>
              <ListItemIcon>
              <AccountCircleIcon />
              </ListItemIcon>
            <ListItemText primary={user.username} />
            </ListItem> */}
            <Grid>
               
                <Button onClick={showUserInfo} variant="text" ><AccountCircleIcon />  {user.username}</Button>
              </Grid>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />

          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Grid>
            <Box component="form" sx={{ mt: 1 }}>
            
            {userInfo && userInfo.username? (
              
              <div>
              <Typography variant="h4">User Information</Typography>
              <TextField id="outlined-basic" 
              label="Username" 
              variant="standard" 
              fullWidth
              name="username"
              defaultValue={userInfo.username}
              disabled
              />

              <TextField id="outlined-basic" 
              label="First name" 
              variant="standard" 
              fullWidth
              name="firstname"
              defaultValue={userInfo.first_name}
              disabled
              />

              <TextField id="outlined-basic" 
              label="Last Name" 
              variant="standard" 
              fullWidth
              name="lastname"
              defaultValue={userInfo.last_name}
              disabled
              />
              </div>
            ):("")}
            </Box>
            </Grid>
            
          </Box>
        </Box>
    </ThemeProvider>
  );
};
