import React from 'react'
import Nav from './Nav'
import MsgInput from './MsgInput'
import ChatArea from './ChatArea'
import { Box } from '@mui/material'

const TalkerUi = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh', // Full height of the viewport
    }}>
      <Nav />
      <ChatArea />
      <MsgInput />
    </Box>
  )
}

export default TalkerUi