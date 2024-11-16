import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../scripts/supabaseClient";
import { arrangeFetchedMessages } from "../scripts/app";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

// Thunk for generating the AiResponse/message
export const talkerResponse = createAsyncThunk(
  "messages/talkerResponse",
  async ({ prompt, dummyMsgId }, { rejectWithValue }) => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_TALKER_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const result = await model.generateContent(prompt);
      const talkerResponse = result.response.text();
      return { talkerResponse, dummyMsgId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching messages related to a conversation
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (conversation_id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversation_id) // Filter messages by conversation_id
        .order("created_at", { ascending: true });

      if (error) throw error;

      return data; // Return the fetched messages
    } catch (err) {
      return rejectWithValue(err.message); // Handle errors
    }
  }
);

// Thunk for storing a newMessage in supaBase
export const storeMsgInSupabase = createAsyncThunk(
  "messages/storeMsgInSupabase",
  async ({ msg, conversation_id }, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("messages").insert([{
        message_id: msg.id,
        conversation_id: conversation_id,
        sender: msg.sender,
        content: msg.content,
      }]);
      if (error) {
        throw error;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMsg: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMsgContent: (state, action) => {},
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(talkerResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(talkerResponse.fulfilled, (state, action) => {
        const { talkerResponse, dummyMsgId } = action.payload;
        // Find the existing message by dummyMsgId and update its content
        const existingTalkerMsg = state.messages.find(msg => msg.id === dummyMsgId);
        if(existingTalkerMsg){
          existingTalkerMsg.content = talkerResponse; 
        }
      })
      .addCase(talkerResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state.error)
      })
      // handling action's for fetchingMessages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        // arranging the fetchedMessages in chronological order with their creating time
        const arrangedMessages = arrangeFetchedMessages(action.payload);
        state.messages = arrangedMessages;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addMsg, clearMessages } = messageSlice.actions;

export default messageSlice.reducer;
