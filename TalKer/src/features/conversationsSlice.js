import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../scripts/supabaseClient"; // adjust the import path as needed
import { GoogleGenerativeAI } from "@google/generative-ai";

// Async thunk for fetching conversations from Supabase
export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("conversations").select("*").eq('user_id',userId); // Modify the query as needed to fit your database schema
      if (error) throw error;
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// creating a conversation in supaBase
export const createConversationInSupabase = createAsyncThunk(
  "conversations/createConversation",
  async (conversation, { rejectWithValue }) => {
    try {
      // Create a new conversation in the Supabase table
      const { data, error } = await supabase
        .from("conversations") // Replace with your actual table name
        .insert([
          {
            conversation_id: conversation.conversation_id, // Generate a unique ID for the conversation
            user_id: conversation.user_id,
            title: conversation.title,
          },
        ]);

      if (error) {
        throw error;
      } // If there's an error, throw it

      return data[0]; // Return the created conversation data
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors gracefully
    }
  }
);

// generating conversation title's
export const generateConversationTitle = createAsyncThunk(
  "conversations/generateConversationTitle",
  async (message, { rejectWithValue }) => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_TALKER_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Combine all message texts into one input string
      // const conversationText = messages.map(msg => msg.text).join(' ');
      const conversationText = message;

      // Modify the prompt to instruct the model to generate a title
      const prompt = `Create a concise and relevant title for the following conversation: "${conversationText}" and only give me the title.`;

      const result = await model.generateContent(prompt);
      return result.response.text(); // Assuming this returns the response as text
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const conversationsSlice = createSlice({
  name: "conversations",
  initialState: {
    conversations: [],
    activeConversationId: null,
    activeIndex: null, // for selectedConversation
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addConversation: (state, action) => {
      state.conversations = [...state.conversations, action.payload];
    },
    setActiveConversationId(state, action) {
      state.activeConversationId = action.payload;
      localStorage.setItem('activeConversationId',JSON.stringify(action.payload))
    },
    clearActiveConversationId(state) {
      localStorage.setItem('activeConversationId',JSON.stringify(null));
      state.activeConversationId = null;
    },
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // handle fetchingConversations action's
      .addCase(fetchConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // handle 
  },
});

export const { addConversation, setActiveConversationId, clearActiveConversationId, setActiveIndex } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;
