import React, { useState, useEffect } from 'react';
import { InputBase, IconButton, Typography, Box, Collapse } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux'
import { addMsg, storeMsgInSupabase, talkerResponse } from '../../features/messageSlice'
import { addConversation, createConversationInSupabase, fetchConversations, generateConversationTitle, setActiveConversationId, setActiveIndex } from '../../features/conversationsSlice'
import { generateUniqueId } from '../../scripts/app'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StopIcon from "@mui/icons-material/Stop";

const MsgInput = ({ messageInputRef, chatContainerRef, showScrollButton, setShowScrollButton }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrollButtonPosition, setScrollButtonPosition] = useState('-55px');
  const activeConversationId = useSelector((state) => state.conversations.activeConversationId);
  const conversations = useSelector((state) => state.conversations.conversations);
  const messages = useSelector((state) => state.messages.messages);
  const loading = useSelector((state) => state.messages.loading);

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
    const userMessage = {
      id: generateUniqueId(),
      content: message,
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
    const updatedTalkerMsg = { ...talkerMsg, content: talkerResponseContent };

    if (!activeConversationId) {
      try {
        // Generate a conversation title
        const response = await dispatch(generateConversationTitle(userMessage.content));
        const conversationTitle = response.payload;
        const now = new Date();
        const conversation = {
          conversation_id: generateUniqueId(),
          user_id: user.uid,
          title: conversationTitle,
          created_at: now.toISOString()
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
        await dispatch(createConversationInSupabase(conversation));
        dispatch(storeMsgInSupabase({ msg: userMessage, conversation_id: conversation.conversation_id }));
        dispatch(storeMsgInSupabase({ msg: updatedTalkerMsg, conversation_id: conversation.conversation_id }));
      } catch (error) {
        const now = new Date();
        const untitledConversation = {
          conversation_id: generateUniqueId(),
          user_id: user.uid,
          title: 'New Chat',
          created_at: now.toISOString()
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

  // Handling Scrolling of chatArea
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };
  useEffect(() => {
    // 1. Handle scroll events
    const chatContainer = chatContainerRef.current;
    const handleScroll = () => {
      if (chatContainer) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer;
        setShowScrollButton(scrollHeight - scrollTop - clientHeight > 50);
      }
    };

    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
    }

    // 2. Scroll to bottom when messages or loading state changes
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    };

    if (messages.length > 0) {
      scrollToBottom(); // Scroll to bottom on message change
    }

    if (!loading) {
      scrollToBottom(); // Scroll to bottom when loading finishes
    }

    // 3. Dynamically adjust button position based on input height
    const resizeObserver = new ResizeObserver(() => {
      if (messageInputRef.current) {
        const inputFieldHeight = messageInputRef.current.scrollHeight;
        const buttonPosition = inputFieldHeight > 100 ? '-56px' : '-56px'; // Adjust as needed
        setScrollButtonPosition(buttonPosition);
      }
    });

    if (messageInputRef.current) {
      resizeObserver.observe(messageInputRef.current); // Observe input height changes
    }

    // Cleanup functions for both scroll event listener and resize observer
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }

      if (messageInputRef.current) {
        resizeObserver.unobserve(messageInputRef.current); // Clean up observer
      }
    };
  }, [messages, loading]); // Dependencies: Runs on message change or loading state change

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <Box
      sx={{
        maxWidth: {
          xs: "600px",
        },
        width: {
          sm: "600px",
        },
        mx: {
          sm: "auto",
        },
        position: "relative",
        pt: "4px",
      }}
    >
      {/* scrollDown button */}
      {showScrollButton && (
        <IconButton onClick={scrollToBottom}
          sx={{
            position: 'absolute', // Positioned relative to chatArea
            top: scrollButtonPosition,
            left: '50%', // Centered horizontally
            transform: 'translateX(-50%)', // Center adjustment
            backgroundColor: '#212121',
            color: 'white',
            borderRadius: '50%',
            border: '1px solid #383737',
            width: 40,
            height: 40,
            zIndex: 1000,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: '#333333',
            },
          }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      )}

      {/* InputField and SendBtn Container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mx: "12px",
          gap: "6px",
        }}
      >
        {/* Input Field Container */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2F2F2F",
            borderRadius: "30px",
            py: message.trim() ? "7px" : "3px",
            pl: "7px",
            pr: "5px",
          }}
        >
          <InputBase
            ref={messageInputRef}
            name="Message-Input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isRecording ? 'Listening...' : 'Message TalKer'}
            multiline
            minRows={1} // Minimum rows for input
            maxRows={7} // Maximum rows for input
            sx={{
              flex: 1, // Allow input to take all available space
              fontSize: '16px',
              color: 'white',
              pl: '12px',
              borderRadius: '8px',
              '& .MuiInputBase-input': {
                border: 'none',
                outline: 'none',
                overflowY: 'auto', // Enable vertical scrolling for overflow content
                wordBreak: 'break-word', // Wrap long words
                whiteSpace: 'pre-wrap', // Preserve white space and new lines
                height: 'auto', // Automatically adjust height
              },
            }}
          />
          <IconButton
            onClick={toggleRecording}
            sx={{
              color: "white",
              marginLeft: "8px",
              display: message.trim() ? "none" : "flex",
            }}
          >
            {isRecording ? <MicOffIcon /> : <MicIcon />}
          </IconButton>
        </Box>

        {/* Send Button */}
        <IconButton
          onClick={handleSend}
          disabled={!message.trim()}
          sx={{
            backgroundColor: !message.trim() ? '#676767 !important' : 'white',
            borderRadius: '50%', // Fully rounded button
            padding: '8px',
            '&:hover': {
              backgroundColor: !message.trim() ? '#676767 !important' : 'white',
            },
          }}
        >
          <KeyboardArrowUpIcon
            sx={{
              color: !message.trim() ? '#2F2F2F !important' : '#000000',
            }}
          />
        </IconButton>
      </Box>

      {/* Recording UI with Sliding Animation */}
      <Collapse in={isRecording} timeout={300}>
        <Box
          sx={{
            backgroundColor: "#2F2F2F",
            borderRadius: "8px",
            mt: '12px',
            p: 2,
            mx: '12px',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            height: "150px", // Fixed height for the recording UI
          }}
        >
          {/* Timer */}
          <Typography
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              fontSize: "14px",
            }}
          >
            00:30
          </Typography>

          {/* Stop Recording */}
          <IconButton
            onClick={toggleRecording}
            sx={{
              color: "white",
              backgroundColor: "#FF5252",
              borderRadius: "50%",
              mb: 2,
              "&:hover": {
                backgroundColor: "#FF0000",
              },
            }}
          >
            <StopIcon />
          </IconButton>

          {/* Text */}
          <Typography sx={{ color: "white", fontSize: "16px" }}>
            Tap to stop recording
          </Typography>
        </Box>
      </Collapse>

      {/* Disclaimer message */}
      <Typography
        variant="body2"
        color="primary"
        sx={{ padding: "8px", textAlign: "center" }}
      >
        TalKer can make mistakes. Check important info.
      </Typography>
    </Box>
  );
};

export default MsgInput;
