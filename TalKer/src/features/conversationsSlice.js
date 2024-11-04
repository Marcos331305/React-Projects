import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../scripts/supabaseClient'; // adjust the import path as needed

// Async thunk for fetching conversations from Supabase
export const fetchConversations = createAsyncThunk(
  'conversations/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*'); // Modify the query as needed to fit your database schema
      if (error) throw error;
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    conversations: [],
    selectedConversation: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    selectConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { selectConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
