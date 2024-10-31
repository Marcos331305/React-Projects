import React, { useState } from 'react';
import { InputBase, IconButton, Typography, Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from '../../features/messageSlice'

const MsgInput = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  // handle Msg sending btn
  const handleSend = () => {
    const cleanedMessage = message.trim().replace(/\s+/g, ' ');
    console.log('clicked')
  };

  return (
    <Box sx={{ maxWidth: '600px' }}>
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
        <InputBase id='Message-Input' onChange={(e) => setMessage(e.target.value)}
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
