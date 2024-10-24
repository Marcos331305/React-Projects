import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { handleLogin, setAuthState } from '../features/authSlice'

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

  // CountDown and navigation login for my finalAuth
  const [countDown, setCountDown] = useState(3); // Start countdown at 3
  useEffect(() => {
    if (authState.isAuthenticated) {
      const timer = setInterval(() => {
        setCountDown((prev) => {
          if (prev > 0) {
            return prev - 1; // Decrease countdown
          } else {
            clearInterval(timer); // Clear the interval
            return 0; // Return 0 at the end of countdown
          }
        });
      }, 1000);
  
      // Check when the countdown hits 0 and then navigate
      if (countDown === 0) {
        dispatch(setAuthState());
        navigate('/talker');
      }
  
      // Clean up the interval when component unmounts or authState changes
      return () => clearInterval(timer);
    }
  }, [authState.isAuthenticated, countDown, navigate]);
  
  const [showPassword, setShowPassword] = useState(false);

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
    dispatch(handleLogin({ emailInput, passwordInput }));
  };

  const handleSignupClick = () => {
    navigate('/signUp');
  };

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
      }}>
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
          <Checkbox
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

        {/* Show final logging in message with countdown if no issues with login process */}
        {authState.isAuthenticated && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="success" size="small">
              {`Logging in, Please wait for `}
              <span style={{ fontWeight: 'bold', color: 'red' }}>
                {countDown}
              </span>
              {` seconds ...`}
            </Alert>
          </Stack>
        )}

        <div style={{ marginTop: "16px", fontSize: "10px" }} margin="left">
          <a style={{ fontSize: '15px' }}>Forgot Password</a>
          <br />
          <p style={{ display: 'inline', fontSize: '15px' }}>Don't have an account ?{" "}</p>
          <small onClick={handleSignupClick} style={{ textDecoration: "underline", color: "blue", cursor: 'pointer', fontSize: '13px', display: 'inline' }}>
            Sign Up
          </small>
        </div>
      </Box>
    </Box>
  );
}
