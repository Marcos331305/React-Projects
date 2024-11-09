import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import UserMessageContainer from './UserMessageContainer'
import AiMessageContainer from './AiMessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMessages } from '../../features/messageSlice'

const ChatArea = () => {
    const  { conversationId }  = useParams(); // getting the conversationId from the routeParameters
    const messages = useSelector((state) => state.messages.messages);
    const dispatch = useDispatch();

    // getting the conversationMessages only if the conversationId is available
    useEffect(() => {
        if(conversationId){
            dispatch(fetchMessages(conversationId));
        }
    },[conversationId]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                overflowY: 'auto', // Enable vertical scrolling
                borderRadius: '8px', // Optional: rounded corners
            }}
        >
            {/* User Messages & their Responses */}
            {messages.length === 0 ? (
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <Typography sx={{
                        mb: 2,
                        fontSize: '30px',
                        fontWeight: 600,
                        color: 'white'
                    }}>
                        What can I help with?
                    </Typography>
                </Box>
            ) : (
                messages.map((msg) => (
                    <Box
                        key={msg.id}
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
            )}
        </Box>
    );
};


export default ChatArea;
