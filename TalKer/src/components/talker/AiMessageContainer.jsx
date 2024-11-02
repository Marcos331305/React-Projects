import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled container for AI messages
const Container = styled(Box)({
    display: 'flex',
    alignItems: 'flex-start', // Align items at the start
    borderRadius: '8px',
    padding: '0px',
    marginBottom: '18px',
    color: 'white',
});

// Styled logo
const Logo = styled('img')({
    width: '20px',
    height: '20px',
});

const AiMessageContainer = ({ message }) => {
    return (
        <Container>
            {/* Box for the logo */}
            <Box sx={{
                padding: '5px',
                border: '1px solid #424242',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px', // Space between logo and text
                flexShrink: 0, // Prevents the box from resizing
            }}>
                <Logo src={'/talkerLogo.svg'} alt="App Logo" />
            </Box>

            {/* Text container with top margin */}
            <Typography sx={{
                lineHeight: '28px',
                flex: 1, // Allows the text to grow and take up space
                wordBreak: 'break-word', // Ensures long words wrap properly
                marginTop: '2px', // Add top margin to the text
            }} variant="body1">
                {message}
            </Typography>
        </Container>
    );
};

export default AiMessageContainer;
