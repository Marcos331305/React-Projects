import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import messageReducer from "../features/messageSlice";
import conversationsReducer from "../features/conversationsSlice";

const persistConfig = {
  key: "root", // Key for the persist store
  storage, // Specify the storage engine
  whitelist: ["conversations"], // Specify which reducers to persist (optional)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
    conversations: conversationsReducer,
    rootReducer: persistedReducer, // Use the persisted reducer for the root
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);
