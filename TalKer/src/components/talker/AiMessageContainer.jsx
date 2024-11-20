import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ReactMarkdown from 'react-markdown';
import { parseTalKerResponse } from '../../scripts/app'
import CodeBox from './CodeBox';

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
    // Parse the message into interleaved text and code blocks
    const content = parseTalKerResponse(message);
  
    return (
      <Container sx={{ width: '100%' }}>
        {/* Box for the logo */}
        <Box
          sx={{
            padding: '5px',
            border: '1px solid #424242',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px',
            flexShrink: 0,
          }}
        >
          <Logo src={'/talkerLogo.svg'} alt="App Logo" />
        </Box>
  
        {/* Text container with top margin */}
        <Box
          sx={{
            lineHeight: '28px',
            flex: 1,
            wordBreak: 'break-word',
            marginTop: '-13px',
            width: {
              xs: '88%',
              sm: '80%',
              md: '60%',
              lg: '50%',
              xl: '40%',
            },
            maxWidth: '100%',
          }}
        >
          {isLoading ? (
            <Typography sx={{ color: '#757575', mt: '18px' }}>
              Generating, please wait...
            </Typography>
          ) : (
            <>
              {content.map((item, index) =>
                item.type === 'text' ? (
                    <ReactMarkdown key={index}>{item.value}</ReactMarkdown>
                ) : (
                  <CodeBox
                    key={index}
                    language={item.language}
                    code={item.value}
                  />
                )
              )}
            </>
          )}
        </Box>
      </Container>
    );
  };  

export default AiMessageContainer;