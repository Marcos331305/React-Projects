import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import { Typography, Box } from '@mui/material';
import AiMessageContainer from './talker/AiMessageContainer';
import UserMessageContainer from './talker/UserMessageContainer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationWithMessages } from '../features/conversationsSlice';

const ShareConversation = () => {
  const dispatch = useDispatch();
  const { conversationId: conversationIdAsString } = useParams();
  const { conversation, messages, status, error } = useSelector((state) => state.conversations);

  useEffect(() => {
    if (conversationIdAsString) {
      const conversationId = Number(conversationIdAsString);
      dispatch(fetchConversationWithMessages(conversationId));
    }
  }, [conversationIdAsString, dispatch]);

  return (
    <Box sx={{ px: 2, pt: { xs: 2, sm: '40px' }, maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* React Helmet for Dynamic Title */}
      <Helmet>
        <title>{conversation ? `TalKer - ${conversation.title}` : 'TalKer'}</title>
      </Helmet>

      {/* Conversation heading & creation date */}
      <Box sx={{
        borderBottom: '1px solid #ececec'
      }}>
        <Typography sx={{ marginBottom: {xs: '12px', sm: '16px'}, color: '#ececec', fontSize: {xs: '30px', sm: '36px'}, fontWeight: 550, lineHeight: '37.5px' }}>
          {conversation && conversation.title}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: {xs: '12px', sm: '16px'}, color: '#B4B4B4' }}>
          {conversation && format(new Date(conversation.created_at), 'MMMM dd, yyyy')}
        </Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ mx: -2, flexGrow: 1 }}>
        {
          messages && messages.map((msg, index) => (
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
        padding: {xs: '8px', lg: '16px'},
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