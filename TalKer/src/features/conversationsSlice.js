import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../scripts/supabaseClient"; // adjust the import path as needed
import { GoogleGenerativeAI } from "@google/generative-ai";

// Async thunk for fetching conversations from Supabase
export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", userId) // Modify the query as needed to fit your database schema
        .order("created_at", { ascending: false }); // Sort by created_at in descending order
      if (error) throw error;
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for updating the conversationTitle in Supabase
export const updateConversationTitle = createAsyncThunk(
  "conversations/fetchConversations",
  async (
    { activeConversationId, activeConversationTitle },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .update({ title: activeConversationTitle })
        .eq("conversation_id", activeConversationId);
      if (error) throw error;
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create an async thunk for deleting a conversation from Supabase
export const delConversationFromSupabase = createAsyncThunk(
  "conversations/delConversationFromSupabase",
  async (activeConversationId, { rejectWithValue }) => {
    try {
      // Perform the delete operation in Supabase
      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("conversation_id", activeConversationId); // Make sure 'id' is the correct column name in your table
      if (error) {
        throw error;
      }
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message in case of failure
    }
  }
);

// Async thunk for fetching conversation & related messages from Supabase
export const fetchConversationWithMessages = createAsyncThunk(
  "conversation/fetchWithMessages",
  async (conversationId) => {
    const { data, error } = await supabase
      .from("conversations")
      .select(`*, messages(*)`) // Fetch related messages using Supabase's relational syntax
      .eq("conversation_id", conversationId);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      throw new Error("Conversation not found");
    }

    return data[0]; // Assuming the conversation ID is unique
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
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

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
    conversation: null, // shared conversation
    messages: [], // messages of sharedConversation
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addConversation: (state, action) => {
      state.conversations = [action.payload, ...state.conversations];
    },
    setActiveConversationId(state, action) {
      state.activeConversationId = action.payload;
      localStorage.setItem(
        "activeConversationId",
        JSON.stringify(action.payload)
      );
    },
    clearActiveConversationId(state) {
      localStorage.setItem("activeConversationId", JSON.stringify(null));
      state.activeConversationId = null;
    },
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    delConversation: (state, action) => {
      const { activeConversationId } = action.payload;
      if (activeConversationId) {
        // Filter out the conversation that matches the conversationId
        const updatedConversations = state.conversations.filter(
          (conversation) =>
            conversation.conversation_id !== activeConversationId
        );
        // Update the state with the new conversations array
        state.conversations = updatedConversations;
      }
    },
    renConversation: (state, action) => {
      const { activeConversationId, newTitle } = action.payload;

      // Map through the conversations and find the one to update
      const updatedConversations = state.conversations.map((conversation) => {
        if (conversation.conversation_id === activeConversationId) {
          return {
            ...conversation,
            title: newTitle,
          };
        }
        return conversation;
      });

      return {
        ...state,
        conversations: updatedConversations,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // handle fetchingConversations action's
      .addCase(fetchConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload)) {
          state.conversations = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // handle fethcingConversatinWithMsg action's
      .addCase(fetchConversationWithMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConversationWithMessages.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchConversationWithMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const {
  addConversation,
  setActiveConversationId,
  clearActiveConversationId,
  setActiveIndex,
  delConversation,
  renConversation,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
