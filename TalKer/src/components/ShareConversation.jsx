import React from 'react';
import { Typography, Box } from '@mui/material';
import AiMessageContainer from './talker/AiMessageContainer';
import UserMessageContainer from './talker/UserMessageContainer';

const ShareConversation = () => {
    const conversationDate = '2024-11-16'; // Replace with the actual conversation creation date
    const messages = [
        { sender: 'user', content: 'Hello, how are you?' },
        { sender: 'TalKer', content: 'I am doing well, thank you!' },
        { sender: 'user', content: 'Great! Can you help me with coding?' },
        { sender: 'TalKer', content: 'yes i can help you in coding , tell me what queries you have' }
        // Add more messages as needed
    ];

    return (
        <Box sx={{ px: 2, pt: 2, maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  {/* Conversation heading & creation date */}
  <Box sx={{
    borderBottom: '1px solid #ececec'
  }}>
    <Typography sx={{ marginBottom: '12px', color: '#ececec', fontSize: '30px', fontWeight: 550, lineHeight: '37.5px' }}>
      Staffing Concepts and Nature
    </Typography>
    <Typography variant="body1" sx={{ marginBottom: '12px', color: '#B4B4B4' }}>
      November 14, 2024
    </Typography>
  </Box>

  {/* Messages */}
  <Box sx={{ mx: -2, flex: 1 }}>
    {
      messages.map((msg, index) => (
        <Box
          key={msg.id || index}
          sx={{
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', // Align messages
          }}
        >
          {msg.sender === 'user' ? (
            <UserMessageContainer message={msg.content} />
          ) : (
            <AiMessageContainer message={msg.content} />
          )}
        </Box>
      ))
    }
  </Box>

  {/* Footer */}
  <Box sx={{
    padding: '8px',
    textAlign: 'center',
    color: '#B4B4B4',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: '#212121'
  }}>
    <Typography variant="body2">
      TalKer : Shared Public Conversation Link
    </Typography>
  </Box>
</Box>

    );
};

export default ShareConversation;