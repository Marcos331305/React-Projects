import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../scripts/supabaseClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDebugValue } from "react";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  rememberMe: false,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const handleLogin = createAsyncThunk("auth/handleLogin", async ({ emailInput, passwordInput }) => {
  // handling userLogin with supabase
  console.log(emailInput)
  console.log(passwordInput)
  const email = emailInput;
  const password = passwordInput;
  try {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (user) {
      console.log('user logged Successfully >>>>');
      console.log(user);
      console.log(session);
    } else if (error) {
      console.log(error);
    }
  } catch (error) {
    console.log("Some Technical Error ha Arrived , so Login Failed !",error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupUser: async (state, action) => {
      console.log(action.payload);
      state.name = action.payload.usernameInput;
      state.email = action.payload.emailInput;
      state.rememberMe = action.payload.rememberMe;

      // handling userSignup with supabase
      try {
        const { user, session, error } = await supabase.auth.signUp({
          email: action.payload.emailInput,
          password: action.payload.passwordInput,
        });
        if (user) {
          console.log(user);
        } else if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log("Some Technical Error ha Arrived , so Signup Failed !");
      }
    },
    loginUser: (state) => {},
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signupUser, loginUser, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
