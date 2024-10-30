import React from 'react'
import Nav from './Nav'
import MsgInput from './MsgInput'
import ChatArea from './ChatArea'
import { Box } from '@mui/material'

const TalkerUi = () => {
  const apiKey = import.meta.env.VITE_TALKER_API_KEY;
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh', // Full height of the viewport
    }}>
      <Nav />
      <ChatArea />
      <MsgInput />
    </Box>
  )
}

export default TalkerUi