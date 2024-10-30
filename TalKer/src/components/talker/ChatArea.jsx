import React from 'react';
import { Box, Typography } from '@mui/material';

const ChatArea = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                overflowY: 'auto', // Enable vertical scrolling
                borderRadius: '8px', // Optional: rounded corners
                px: '12px', // Padding inside the chat area
                py: '18px',
                display: 'flex',
                justifyContent: 'center', // Center the content horizontally
                alignItems: 'center', // Center the content vertically
                textAlign: 'center', // Center the text
            }}
        >
            <Typography sx={{ 
                mb: 2,
                fontSize: '30px',
                fontWeight: 600,
                color: 'white'
             }}>
                What can I help with?
            </Typography>
        </Box>
    );
};

export default ChatArea;
