import { combineReducers } from "redux";
import authReducer from "../features/authSlice";
import messageReducer from "../features/messageSlice";
import conversationsReducer from "../features/conversationsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  messages: messageReducer,
  conversations: conversationsReducer
  // Add more reducers as needed
});

export default rootReducer;
