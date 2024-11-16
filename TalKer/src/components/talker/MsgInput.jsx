import React, { useState, useEffect } from 'react';
import { InputBase, IconButton, Typography, Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux'
import { addMsg, storeMsgInSupabase, talkerResponse } from '../../features/messageSlice'
import { addConversation, createConversationInSupabase, fetchConversations, generateConversationTitle, setActiveConversationId, setActiveIndex } from '../../features/conversationsSlice'
import { generateUniqueId } from '../../scripts/app'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const MsgInput = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeConversationId = useSelector((state) => state.conversations.activeConversationId);
  const conversations = useSelector((state) => state.conversations.conversations);

  // Initialize the Firebase Auth instance
  const auth = getAuth();
  // Get the current user
  const user = auth.currentUser;

  // fetch conversation when the component Mounts
  useEffect(() => {
    dispatch(fetchConversations(user.uid));

    // Retrieve stored data from localStorage
    const storedData = localStorage.getItem('activeConversationId');

    if (storedData) {
      try {
        // Attempt to parse the stored data only if it's defined and not null
        const activeConversationId = JSON.parse(storedData);
        dispatch(setActiveConversationId(activeConversationId));
      } catch (error) {
        console.log("No activeConversationId Currently !!!");
      }
    }
  }, []);

  // handle Msg sending btn
  const handleSend = async () => {
    const cleanedMessage = message.trim().replace(/\s+/g, ' ');
    const userMessage = {
      id: generateUniqueId(),
      content: cleanedMessage,
      sender: 'user'
    };

    // Add user message to Redux state for immediate UI update
    dispatch(addMsg(userMessage));
    setMessage(''); // Clear the input field

    // Adding talkerMessage immediately for better exprience
    const talkerMsg = {
      id: generateUniqueId(),
      content: '',
      sender: 'TalKer'
    };
    dispatch(addMsg(talkerMsg));

    // Generate TalKer response & update the messageContent of added talkerMessage in reduxState
    const { payload: talkerResponseObj } = await dispatch(talkerResponse({ prompt: userMessage.content, dummyMsgId: talkerMsg.id }));
    const talkerResponseContent = talkerResponseObj.talkerResponse;
    // // And now when the talkerResponse comes update the talkerMsg for storing in supabase
    const updatedTalkerMsg = {...talkerMsg, content: talkerResponseContent};

    if (!activeConversationId) {
      try {
        // Generate a conversation title
        const response = await dispatch(generateConversationTitle(userMessage.content));
        const conversationTitle = response.payload;
        const conversation = {
          conversation_id: generateUniqueId(),
          user_id: user.uid,
          title: conversationTitle
        };

        // Add new conversation to Redux state
        dispatch(addConversation(conversation));
        dispatch(setActiveConversationId(conversation.conversation_id)); // Ensure the conversation is active

        // Short delay to allow the sidebar to recognize the new active conversation
        setTimeout(() => {
          dispatch(setActiveIndex(conversations.length)); // Last item index
          navigate(`/talker/c/${conversation.conversation_id}`);
        }, 50); // 50ms delay to ensure state and UI sync

        // Save the new conversation and messages to Supabase
        dispatch(createConversationInSupabase(conversation));
        dispatch(storeMsgInSupabase({ msg: userMessage, conversation_id: conversation.conversation_id }));
        dispatch(storeMsgInSupabase({ msg: updatedTalkerMsg, conversation_id: conversation.conversation_id }));
      } catch (error) {
        const untitledConversation = {
          conversation_id: generateUniqueId(),
          user_id: user.uid,
          title: 'New Chat'
        };

        dispatch(addConversation(untitledConversation));
        dispatch(setActiveConversationId(untitledConversation.conversation_id));

        // Delay to ensure state is fully updated
        setTimeout(() => {
          dispatch(setActiveIndex(conversations.length));
          navigate(`/talker/c/${untitledConversation.conversation_id}`);
        }, 100);

        dispatch(createConversationInSupabase(untitledConversation));
        dispatch(storeMsgInSupabase({ msg: userMessage, conversation_id: untitledConversation.conversation_id }));
        dispatch(storeMsgInSupabase({ msg: updatedTalkerMsg, conversation_id: untitledConversation.conversation_id }));
      }
    } else {
      dispatch(storeMsgInSupabase({ msg: userMessage, conversation_id: activeConversationId }));
      dispatch(storeMsgInSupabase({ msg: updatedTalkerMsg, conversation_id: activeConversationId }));
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
