import React from 'react';
import { Box, Typography } from '@mui/material';

const UserMessageContainer = ({ message }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#2F2F2F',
                borderRadius: '1.5rem', // Rounded corners
                padding: '10px 20px', // Padding inside the box
                color: 'white', // Text color for better contrast
                maxWidth: '70%', // Limit the width of the message
                width: 'fit-content', // Only takes as much width as required
                alignSelf: 'flex-end', // Aligns the box to the right side
                wordWrap: 'break-word', // Ensures long words break correctly
                marginBlock: '18px',
                marginInline: '12px'
            }}
        >
            <Typography variant="body1">{message}</Typography>
        </Box>
    );
};


export default UserMessageContainer;
