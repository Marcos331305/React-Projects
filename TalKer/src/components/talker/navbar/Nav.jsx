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
import { clearActiveConversationId, setActiveIndex } from '../../../features/conversationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearMessages } from '../../../features/messageSlice';

const Nav = ({ setShowScrollButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeIndex = useSelector((state) => state.conversations.activeIndex);

  const handleConBar = () => {
    setIsOpen(!isOpen);
  };

  const handleNewConversation = () => {
    dispatch(setActiveIndex(null));
    dispatch(clearActiveConversationId());
    dispatch(clearMessages()); // Clear previous messages
    setShowScrollButton(false);
    navigate('/talker');
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
          <IconButton onClick={handleNewConversation} edge="end" color="inherit" aria-label="new-conversation">
            <AddCircleIcon color='primary' />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* rendering sideBar */}
      <SideBar isOpen={isOpen} handleConBar={handleConBar} setShowScrollButton={setShowScrollButton} />
    </>
  );
};

export default Nav;
