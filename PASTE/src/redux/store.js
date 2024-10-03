import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from '../features/paste/pasteSlice'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})
