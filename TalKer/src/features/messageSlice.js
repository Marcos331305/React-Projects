import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [],
}

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
        state.messages.push(action.payload);
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMessage, decrement, incrementByAmount } = messageSlice.actions

export default messageSlice.reducer