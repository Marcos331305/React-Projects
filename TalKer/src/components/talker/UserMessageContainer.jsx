import React from 'react';
import { Box, Typography } from '@mui/material';

const UserMessageContainer = ({ message }) => {
    return (
        <Box
            sx={{
                backgroundColor: '#2F2F2F',
                borderRadius: '12px', // Rounded corners
                padding: '12px', // Padding inside the box
                color: 'white', // Text color for better contrast
                maxWidth: '70%', // Limit the width of the message
                width: 'fit-content', // Only takes as much width as required
                alignSelf: 'flex-end', // Aligns the box to the right side
                marginBottom: '18px', // Spacing between messages
                wordWrap: 'break-word', // Ensures long words break correctly
            }}
        >
            <Typography variant="body1">{message}</Typography>
        </Box>
    );
};

export default UserMessageContainer;
