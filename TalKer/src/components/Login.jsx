import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin } from '../features/authSlice'
import Loading from "./Loading";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
  Box,
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const loading = authState.loading;
  const [showPassword, setShowPassword] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);

  // Checking for user session for automatic login
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (userCred) => {
      if (userCred && userCred.emailVerified) {
        // User is signed in and email is verified; navigate to protected route
        navigate('/talker', { replace: true });
      }
      // If user is signed in but email is not verified, do nothing
      setLoadingSession(false); // End loading state to render login UI
    });

    return unsubscribe;
  }, [navigate]);

  // Navigate the user to their appropriate ui after login
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/talker', { replace: true });
    }
  }, [authState.isAuthenticated, navigate]);

  //Inputs
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  //handle Submittion
  const handleSubmit = () => {
    //First of all Check for Errors

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);

    // writing my dispatch for userLogin
    dispatch(handleLogin({ emailInput, passwordInput, rememberMe }));
  };

  const handleSignupClick = () => {
    navigate('/signUp');
  };

  if (loadingSession) {
    return <Loading message="Checking session, please wait..." />; // Display loading while checking session
  }

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box sx={{
        padding: 1,
        width: '350px',
        p: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '7px'
      }}>
        {/* LoadingView */}
        <Loading loading={loading} message={'Logging in, please wait...'} />
        <div>
          <TextField
            label="Email Address"
            fullWidth
            error={emailError}
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={emailInput}
            InputProps={{}}
            size="small"
            onBlur={handleEmail}
            onChange={(event) => {
              setEmailInput(event.target.value);
            }}
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel
              error={passwordError}
              htmlFor="standard-adornment-password"
            >
              Password
            </InputLabel>
            <Input
              error={passwordError}
              onBlur={handlePassword}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(event) => {
                setPasswordInput(event.target.value);
              }}
              value={passwordInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div style={{ fontSize: "15px", display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Checkbox id="rememberMe-checkbox"
            {...label}
            size="medium"
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          Remember Me
        </div>

        <div style={{ marginTop: "10px" }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={handleSubmit}
          >
            LOGIN
          </Button>
        </div>

        {/* Show Form Error if any */}
        {formValid && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="error" size="small">
              {formValid}
            </Alert>
          </Stack>
        )}
        {authState.error && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="error" size="small">
              {authState.error}
            </Alert>
          </Stack>
        )}

        <div style={{ marginTop: "16px", fontSize: "10px" }} margin="left">
          <a style={{ fontSize: '15px' }}>Forgot Password</a>
          <br />
          <p style={{ display: 'inline', fontSize: '15px' }}>Don't have an account ?{" "}</p>
          <small onClick={handleSignupClick} style={{ textDecoration: "underline", color: "blue", cursor: 'pointer', fontSize: '13px', display: 'inline' }}>
            Register
          </small>
        </div>
      </Box>
    </Box>
  );
}
