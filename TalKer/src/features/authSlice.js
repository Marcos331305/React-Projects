import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendEmailVerification,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../scripts/firebase";
import { toast } from "react-toastify";

const initialState = {
  // user: {
  //   name: null,
  //   email: null,
  // },
  loading: false,
  error: null,
  isAuthenticated: false,
  // successfullAuthMsg: null,
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

      // Store userData in dB
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          name: user.displayName,
          email: user.email,
        });
      }

      // Define your custom URL for the verification link
      const actionCodeSettings = {
        // URL you want to redirect back to after verification
        url: "http://localhost:5173/verifyMail", // Change this to your desired URL
        handleCodeInApp: true, // Required for this to work
      };

      // Sending the verification link to User
      await sendEmailVerification(user, actionCodeSettings);

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
  async ({ emailInput, passwordInput, rememberMe }, { rejectWithValue }) => {
    // Set the persistence based on the rememberMe checkbox
    const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    try {
      const auth = getAuth();
      await auth.setPersistence(persistence); // Set persistence for userSession
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput
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
        state.loading = true;
        state.error = null; // Clear previous errors
        state.successfullAuthMsg = null; // Clear previous messages
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        toast.success(
          "User Registered Successfully && verification link sent at Email!!",
          {
            position: "top-center",
          }
        );
        // You can also set state with user data or session if needed
        // state.user = action.payload.user; // Example
      })
      .addCase(handleSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture error message
      })

      // Handle Login Actions
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
        state.successfullAuthMsg = null; // Clear previous messages
      })
      .addCase(handleLogin.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        // You can also set state with user data or session if needed
        // state.user = action.payload.user; // Example
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error message
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAuthState, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
