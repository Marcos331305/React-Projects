import React from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';

const Loading = ({ loading = true, message }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      open={!!loading}
    >
      <CircularProgress color="inherit" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Backdrop>
  );
};

export default Loading;
