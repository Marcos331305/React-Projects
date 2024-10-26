import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  rememberMe: false,
  // loading: false,
  error: null,
  isAuthenticated: false,
  successfullAuthMsg: null,
};

export const handleSignup = createAsyncThunk(
  "auth/handleSignup",
  async (
    { usernameInput, emailInput, passwordInput, rememberMe },
    { rejectWithValue }
  ) => {
    const displayName = usernameInput;
    // handling userSignup with FireBase
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput
      );
      // Signed up successfully
      const user = userCredential.user;

      // Set the display name for the user
      await updateProfile(user, { displayName });
      
      // Return only serializable fields to the Redux store
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName, // This now includes the updated displayName
      };
    } catch (error) {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Return only serializable fields to the Redux store
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName, // This now includes the updated displayName if set
      };
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message with rejectWithValue
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    general: (state, action) => {
      state.value += action.payload;
    },
    setAuthState: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Signup Actions
      .addCase(handleSignup.pending, (state) => {
        state.error = null; // Clear previous errors
        state.successfullAuthMsg = null; // Clear previous messages
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        console.log(action.payload);
        // You can also set state with user data or session if needed
        // state.user = action.payload.user; // Example
      })
      .addCase(handleSignup.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
      })

      // Handle Login Actions
      .addCase(handleLogin.pending, (state) => {
        state.error = null; // Clear previous errors
        state.successfullAuthMsg = null; // Clear previous messages
      })
      .addCase(handleLogin.fulfilled, (state) => {
        state.isAuthenticated = true;
        // You can also set state with user data or session if needed
        // state.user = action.payload.user; // Example
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.error = action.error.message; // Capture error message
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAuthState, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
