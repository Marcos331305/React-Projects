import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SideBar from './SideBar';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConBar = () => {
    setIsOpen(!isOpen);
};

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', py: '2px' }}>
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

      {/* rendering sideBar */}
      <SideBar isOpen={isOpen} handleConBar={handleConBar} />
    </>
  );
};

export default Nav;
