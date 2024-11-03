import React, { useState } from 'react';
import { InputBase, IconButton, Typography, Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux'
import { addMsg, talkerResponse } from '../../features/messageSlice'
import { generateUniqueId } from '../../scripts/app'

const MsgInput = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  // handle Msg sending btn
  const handleSend = () => {
    const cleanedMessage = message.trim().replace(/\s+/g, ' ');
    const userMessage = {
      id: generateUniqueId(), // A unique identifier for each message (e.g., a UUID)
      content: cleanedMessage, // The message content
      sender: 'user' // Who sent the message: 'user' or 'TalKer'
    };
    dispatch(addMsg(userMessage));
    // after adding the message ot ui clear the msgInput field
    setMessage('');
    // Afterthat handling the Response-Generation
   dispatch(talkerResponse(userMessage.content));
  };

  return (
    <Box sx={{
      maxWidth: {
        xs: '600px',
      },
      width: {
        sm: '600px'
      },
      mx: {
        sm: 'auto'
      },
    }}>
      {/* Custom Input Field */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f0f2f5', // Input background color
          borderRadius: '30px', // Fully rounded
          padding: '2px 12px', // Padding for the input box
          backgroundColor: '#2F2F2F',
          mx: '12px'
        }}
      >
        <InputBase id='Message-Input' value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder="Message TalKer"
          sx={{
            flex: 1,
            fontSize: '16px',
            color: 'white',
            padding: '8px 16px',
            '& .MuiInputBase-input': {
              border: 'none',
              outline: 'none',
            },
          }}
        />

        {/* Send Button */}
        <IconButton onClick={handleSend} disabled={!message.trim()}
          sx={{
            backgroundColor: !message.trim() ? '#676767 !important' : 'white',
            borderRadius: '50%', // Fully rounded
            padding: '8px',
            marginLeft: '8px',
            '&:hover': {
              backgroundColor: !message.trim() ? '#676767 !important' : 'white',
            },
          }}
        >
          <KeyboardArrowUpIcon sx={{
            color: !message.trim() ? '#2F2F2F !important' : '#000000',
          }} />
        </IconButton>
      </Box>

      {/* Disclaimer message */}
      <Typography
        variant="body2"
        color="primary"
        sx={{ padding: '8px', textAlign: 'center' }}
      >
        TalKer can make mistakes. Check important info.
      </Typography>
    </Box>
  );
};

export default MsgInput;
