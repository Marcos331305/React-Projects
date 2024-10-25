import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../scripts/supabaseClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  rememberMe: false,
  // loading: false,
  error: null,
  isAuthenticated: false,
  successfullAuthMsg: null
};

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async ({ emailInput, passwordInput }) => {
    // handling userLogin with supabase
    try {
      const { user, session, error } = await supabase.auth.signInWithPassword({
        email: emailInput, // Corrected key here
        password: passwordInput, // Corrected key here
      });

      if (error) {
        throw new Error(error.message); // Throw error to be caught in the rejected case
      }

      // Return user data or session if successful
      return { user, session }; // This will be passed to the fulfilled case
    } catch (error) {
      console.log(`Login Failed!, Because = ${error.message}`);
      throw error; // Rethrow the error to be caught in the rejected case
    }
  }
);

// export const handleSignup = createAsyncThunk(
//   "auth/handleSignup",
//   async ({ usernameInput, emailInput, passwordInput, rememberMe }) => {
//     // handling userSignup with supabase
//     try {
//       const { user, session, error } = await supabase.auth.signUp({
//         email: emailInput, // Corrected key here
//         password: passwordInput, // Corrected key here
//       });
//       console.log("Supabase signup response:", { data, error });

//       if (error) {
//         throw new Error(error.message); // Throw error to be caught in the rejected case
//       }

//       // Return user data or session if successful
//       return { user, session }; // This will be passed to the fulfilled case
//     } catch (error) {
//       console.log(`Signup Failed!, Because = ${error.message}`);
//       throw error; // Rethrow the error to be caught in the rejected case
//     }
//   }
// );
export const handleSignup = createAsyncThunk(
  "auth/handleSignup",
  async ({ emailInput, passwordInput }, { rejectWithValue }) => {
    try {
      // Attempt to sign up the user
      const { user, session, error } = await supabase.auth.signUp({
        email: emailInput,
        password: passwordInput,
      });

      // Check for errors, including duplicate email
      if (error) {
        if (error.message.includes("User already registered")) {
          return rejectWithValue("This email is already registered. Please log in.");
        }
        throw new Error(error.message);
      }

      return { user, session }; // Successful signup
    } catch (error) {
      console.log(`Signup Failed! Reason: ${error.message}`);
      return rejectWithValue(error.message);
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
      })

      // Handle Signup Actions
      .addCase(handleSignup.pending, (state) => {
        state.error = null; // Clear previous errors
        state.successfullAuthMsg = null; // Clear previous messages
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        // You can also set state with user data or session if needed
        // state.user = action.payload.user; // Example
      })
      .addCase(handleSignup.rejected, (state, action) => {
        state.error = action.error.message; // Capture error message
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAuthState, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
