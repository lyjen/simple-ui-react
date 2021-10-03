import { useCallback } from "react";

import { AppPaths } from "../../app/global";
import { useAuthContext } from "../service/auth_context";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import { theme } from "../../app/theme";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link,IconButton,InputAdornment,FormControlLabel} from '@mui/material';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
export const LoginPage = ({ history }) => {

  // const navigate = useNavigate();
  const { isLogged, login, user } = useAuthContext();
  
  const onRegister = useCallback(() => {
    history.push(AppPaths.auth.register);
  }, [history]);

  const onDashboard = useCallback(() => {
    history.push(AppPaths.dashboard.root);
  }, [history]);

  

  // const onLogin = useCallback(() => {
  //   login({}, onDashboard);
  // }, [login, onDashboard]);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: data => {
      console.log("Submit", data);
      login({data}, onDashboard);

    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <div>
    { user ? (
      <Typography variant="h1"> You already signed in </Typography>
    ):(
      <ThemeProvider theme={theme}>
      <FormikProvider value={formik}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </FormikProvider>
    </ThemeProvider>
    )
    }
    </div>
  );
};
