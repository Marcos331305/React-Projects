import React, { useState, useEffect } from 'react';
import { InputBase, IconButton, Typography, Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux'
import { addMsg, talkerResponse } from '../../features/messageSlice'
import { addConversation, createConversationInSupabase, fetchConversations, generateConversationTitle } from '../../features/conversationsSlice'
import { generateUniqueId } from '../../scripts/app'
import { getAuth } from 'firebase/auth';

const MsgInput = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  // fetch conversation when the component Mounts
  useEffect(() => {
    dispatch(fetchConversations());
  }, [])
  
  // Initialize the Firebase Auth instance
  const auth = getAuth();
  // Get the current user
  const user = auth.currentUser;

  // handle Msg sending btn
  const handleSend = async () => {
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
    // Generating the conversation title and adding the conversation in redexState to update ui
    try {
      // Afterthat generating the conversationTitle for a new Conversation & wait till generating it
      const response = await dispatch(generateConversationTitle(userMessage.content));
      const conversationTitle = response.payload;
      const conversation = {
        id: generateUniqueId(),
        user_id: user.uid,
        title: conversationTitle,
      };
      dispatch(addConversation(conversation));
      // and creating the conversation in dB(supabase) also
      dispatch(createConversationInSupabase(conversation));
    } catch (error) {
      const conversation = {
        id: generateUniqueId(),
        user_id: user.uid,
        title: 'Untitled Conversation',
      };
      dispatch(addConversation(conversation));
      dispatch(createConversationInSupabase(conversation));
    }
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
