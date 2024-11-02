import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendEmailVerification,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../scripts/firebase";
import { toast } from "react-toastify";
import { supabase } from "../scripts/supabaseClient";

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
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

      // Store userData in firebasedB
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          name: user.displayName,
          email: user.email,
        });
      }

      // Store userData in supabasedB
      if (user) {
        await supabase
          .from("users") // Replace with your table name
          .insert([
            {
              user_id: user.uid, // Replace with your column name and value
              name: user.displayName,
              email: user.email
              // Add more columns as needed
            },
          ]);
      }

      // Sending the verification link to User
      await sendEmailVerification(user);

      // Return only serializable fields to the Redux store
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName, // This now includes the updated displayName
      };
    } catch (error) {
      // Handle errors
      const errorMessage = error.message;
      let customMessage;
      if (error.code === "auth/email-already-in-use") {
        customMessage = "This email already in use.";
        return rejectWithValue(customMessage);
      } else {
        return rejectWithValue(errorMessage); // Return the error message with rejectWithValue
      }
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async ({ emailInput, passwordInput, rememberMe }, { rejectWithValue }) => {
    // Set the persistence based on the rememberMe checkbox
    const persistence = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;
    try {
      const auth = getAuth();
      await setPersistence(auth, persistence); // Set persistence for userSession
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput
      );
      const user = userCredential.user;

      await auth.currentUser.reload(); // Refresh the user state
      const refreshedUser = auth.currentUser;

      // Return only serializable fields to the Redux store
      return {
        uid: refreshedUser.uid,
        email: refreshedUser.email,
        displayName: refreshedUser.displayName, // This now includes the updated displayName if set
        emailVerified: refreshedUser.emailVerified,
      };
    } catch (error) {
      // Handle errors
      let customMessage;
      switch (error.code) {
        case "auth/invalid-credential":
          customMessage = "Invalid usercredentials, please check.";
          break;
        case "auth/invalid-email":
          customMessage = "The email address is not valid. Please check again.";
          break;
        case "auth/user-not-found":
          customMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          customMessage = "Incorrect password. Please try again.";
          break;
        case "auth/user-disabled":
          customMessage = "This account has been disabled. Contact support.";
          break;
        default:
          customMessage = "An error occurred. Please try again.";
      }
      return rejectWithValue(customMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(
          "Registered Successfully, verification link sent at Email!!",
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
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        const { emailVerified } = action.payload;
        if (emailVerified) {
          state.loading = false;
          state.isAuthenticated = true;
          // Set user data if needed, e.g., state.user = action.payload;
        } else {
          state.loading = false;
          state.error = "Please verify your email before log-In.";
          state.isAuthenticated = false;
        }
        // You can also set state with user data or session if needed
        // state.user = action.payload.user; // Example
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "An error occurred, please try after someTime."; // Capture error message
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
