import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Box, Button, Typography } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CodeBox = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // Reset after 3 seconds
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '8px',
        overflowX: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        mt: 2
      }}
    >
      {/* Banner with language and copy button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#2F2F2F',
          padding: '8px 16px',
          borderRadius: '8px 8px 0 0',
        }}
      >
        <Typography
          sx={{
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          {language}
        </Typography>

        <CopyToClipboard text={code} onCopy={handleCopy}>
          <Button
            variant="contained"
            size="small"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'none',
              fontSize: '12px',
              padding: '4px 8px',
              backgroundColor: '#424242',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#525252',
              },
            }}
          >
            {copied ? (
              <>
                <CheckCircleIcon
                  fontSize="small"
                  sx={{ marginRight: '4px', color: '#4CAF50' }}
                />
                Copied
              </>
            ) : (
              <>
                <FileCopyIcon
                  fontSize="small"
                  sx={{ marginRight: '4px', color: '#FFFFFF' }}
                />
                Copy Code
              </>
            )}
          </Button>
        </CopyToClipboard>
      </Box>

      {/* Code Area */}
      <Box
        sx={{
          backgroundColor: '#0D0D0D',
          padding: '16px',
          borderRadius: '0 0 8px 8px',
          borderLeft: '1px solid #2F2F2F',
          borderRight: '1px solid #2F2F2F',
          borderBottom: '1px solid #2F2F2F',
          overflowX: 'auto',
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          customStyle={{
            margin: 0,
            backgroundColor: 'transparent',
            fontSize: '14px',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};

export default CodeBox;
