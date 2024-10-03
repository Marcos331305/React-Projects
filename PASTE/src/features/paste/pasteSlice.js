import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    createPaste: (state, action) => {
      state.value += action.payload
    },
    removePaste: (state, action) => {
      state.value += action.payload
    },
    updatePaste: (state, action) => {
      state.value += action.payload
    },
    resetAllPastes: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { createPaste, removePaste, updatePaste, resetAllPastes  } = pasteSlice.actions

export default pasteSlice.reducer