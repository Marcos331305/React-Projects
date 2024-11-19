import React from 'react'
import Nav from './navbar/Nav'
import MsgInput from './MsgInput'
import ChatArea from './ChatArea'
import { Box } from '@mui/material'
import { useRef } from 'react'

const TalkerUi = () => {
  // stateLifting
  const messageInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh', // Full height of the viewport
    }}>
      <Nav />
      <ChatArea messageInputRef={messageInputRef} chatContainerRef={chatContainerRef} />
      <MsgInput messageInputRef={messageInputRef} chatContainerRef={chatContainerRef} />
    </Box>
  )
}

export default TalkerUi