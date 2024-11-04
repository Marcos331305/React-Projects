import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateUniqueId } from '../scripts/app'

const initialState = {
  messages: [],
  loading: false,
  error: null
};

// Thunk for generating the AiResponse/message
export const talkerResponse = createAsyncThunk(
  "messages/talkerResponse",
  async (prompt, { rejectWithValue }) => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_TALKER_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const talkerResponse = result.response.text();
      return talkerResponse;
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
        .eq("conversation_id", conversation_id); // Filter messages by conversation_id

      if (error) throw error;

      return data; // Return the fetched messages
    } catch (err) {
      return rejectWithValue(err.message); // Handle errors
    }
  }
);


export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    createMsg: (state, action) => {

    },
    addMsg: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(talkerResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(talkerResponse.fulfilled, (state, action) => {
        state.loading = false;
        // Store the talkerResponse in the messages state
        state.messages.push({ id: generateUniqueId(), content: action.payload, sender: 'TalKer' });
      })
      .addCase(talkerResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addMsg, incrementByAmount } = messageSlice.actions;

export default messageSlice.reducer;
