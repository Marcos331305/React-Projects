import React from 'react'
import { Box, Typography } from '@mui/material'
import UserMessageContainer from './UserMessageContainer'
import AiMessageContainer from './AiMessageContainer'
import { useSelector } from 'react-redux'

const ChatArea = () => {
    const messages = useSelector((state) => state.messages.messages);
    return (
        <Box
            sx={{
                flexGrow: 1,
                overflowY: 'auto', // Enable vertical scrolling
                borderRadius: '8px', // Optional: rounded corners
                px: '12px', // Padding inside the chat area
                py: '18px',
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
                    msg.sender === 'user' ? (
                        <UserMessageContainer key={msg.id} message={msg.text} />
                    ) : (
                        <AiMessageContainer key={msg.id} message={msg.text} />
                    )
                ))
            )}
        </Box>
    );
};

export default ChatArea;
