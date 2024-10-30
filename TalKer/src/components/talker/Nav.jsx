import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen'; // Icon for menu
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Icon for new conversation

const Nav = () => {
    const [isOpen,setIsOpen] = useState(false);

    // function for handling conversationBar
    const handleConBar = () => {

    };

  return (
    <AppBar position="static" sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        py: '2px'
    }}>
      <Toolbar>
        <IconButton onClick={handleConBar} edge="start" color="inherit" aria-label="menu">
          <MenuOpenIcon color='primary' />
        </IconButton>
        
        <Typography color='primary' variant="h6" sx={{ flex: 1, textAlign: 'center', fontWeight: 600 }}>
          TalKer
        </Typography>

        <IconButton edge="end" color="inherit" aria-label="new-conversation">
          <AddCircleIcon color='primary' />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
