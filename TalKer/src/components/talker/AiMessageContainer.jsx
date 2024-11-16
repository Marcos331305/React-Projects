import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ReactMarkdown from 'react-markdown';

// Styled container for AI messages
const Container = styled(Box)({
    display: 'flex',
    alignItems: 'flex-start', // Align items at the start
    borderRadius: '8px',
    padding: '0px',
    color: 'white',
    paddingInline: '12px',
    paddingBlock: '18px'
});

// Styled logo
const Logo = styled('img')({
    width: '20px',
    height: '20px',
});

const AiMessageContainer = ({ message, isLoading }) => {
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
            <Box sx={{
                lineHeight: '28px',
                flex: 1,
                wordBreak: 'break-word',
                marginTop: '-13px',
            }}>
                {isLoading ? (
                    <Typography sx={{ color: '#757575' }}>Generating Response...</Typography> // Placeholder
                ) : (
                    <ReactMarkdown>{message}</ReactMarkdown>
                )}
            </Box>
        </Container>
    );
};

export default AiMessageContainer;
