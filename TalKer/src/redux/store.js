import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import messageReducer from "../features/messageSlice";
import { openaiApi } from "../features/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
    // Api middleWare
    [openaiApi.reducerPath]: openaiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openaiApi.middleware),
});
