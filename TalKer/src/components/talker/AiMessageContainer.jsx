import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled container for AI messages
const Container = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2F2F2F', // Background color for the message container
    borderRadius: '8px', // Rounded corners
    padding: '10px', // Padding inside the container
    margin: '10px 0', // Margin between messages
    color: 'white', // Text color
});

// Styled logo
const Logo = styled('img')({
    width: '40px', // Adjust the size of the logo
    height: '40px',
    marginRight: '10px', // Space between logo and text
});

const AiMessageContainer = ({ message }) => {
    return (
        <Container>
            <Logo src={'/talkerLogo.svg'} alt="App Logo" />
            <Typography variant="body1">{message}</Typography>
        </Container>
    );
};

export default AiMessageContainer;
