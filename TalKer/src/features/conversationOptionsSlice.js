import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../scripts/supabaseClient";

const conversationsSlice = createSlice({
  name: "conversations",
  initialState: {
    activeConversationId: null,
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
