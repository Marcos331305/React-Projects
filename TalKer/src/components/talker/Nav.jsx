import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Box,
  Popover,
  Divider
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useMediaQuery } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthState } from '../../features/authSlice';

const conversations = [
  { id: 1, title: 'Conversation 1' },
  { id: 2, title: 'Conversation 2' },
  { id: 3, title: 'Conversation 3' },
  // Add more conversations as needed
  { id: 4, title: 'Conversation 4' },
  { id: 5, title: 'Conversation 5' },
  { id: 6, title: 'Conversation 6' },
  { id: 7, title: 'Conversation 7' },
  { id: 8, title: 'Conversation 8' },
  { id: 9, title: 'Conversation 9' },
  { id: 10, title: 'Conversation 10' },
  { id: 11, title: 'Conversation 11' },
  { id: 12, title: 'Conversation 12' },
  { id: 13, title: 'Conversation 13' },
  { id: 14, title: 'Conversation 14' },
  { id: 15, title: 'Conversation 15' },
  { id: 16, title: 'Conversation 16' },
  { id: 17, title: 'Conversation 17' },
  { id: 18, title: 'Conversation 18' },
  { id: 19, title: 'Conversation 19' },
  { id: 20, title: 'Conversation 20' },
  { id: 21, title: 'Conversation 21' },
  { id: 22, title: 'Conversation 22' },
  { id: 23, title: 'Conversation 23' },
  { id: 24, title: 'Conversation 24' },
  { id: 25, title: 'Conversation 25' },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect for getting the userDetails when the component Mount's
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // Check if screen size is medium or larger
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const handleConBar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // handle logOut
  const handleLogOut = () => {
    setClicked(true);
    const auth = getAuth();
    // firebase logOut functionality
    setTimeout(async() => {
      await signOut(auth);
      dispatch(setAuthState()); // set the userAuthenticated state to false first that have using in authSlice
      navigate('/'); // Redirect the user to Home-Page(loginPage)
    }, 1000); // Duration of the logOut process
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

      <Drawer anchor="left" open={isOpen} onClose={handleConBar}>
        <Box sx={{ width: 275, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#171717', overflow: 'hidden' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: '6px' }}>
            <IconButton onClick={handleConBar}>
              <MenuOpenIcon color='primary' />
            </IconButton>
            <IconButton>
              <AddCircleIcon color='primary' />
            </IconButton>
          </Toolbar>

          <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {/* App Logo Bar */}
            <ListItem
              sx={{
                backgroundColor: 'transparent',
                ...(isMdUp && {
                  '&:hover': { backgroundColor: '#212121' }, // Hover effect only for md and up
                }),
                justifyContent: 'center',
                pl: 2.5,
                mb: 1.2,
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{
                      padding: '4px',
                      border: '1px solid #424242',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                      flexShrink: 0,
                    }}>
                      <img src="/talkerLogo.svg" alt="App Logo" style={{ width: '16px', height: '16px' }} />
                    </Box>
                    <Typography sx={{ color: '#ECECEC', fontSize: '16px', fontWeight: 600 }}>TalKer</Typography>
                  </Box>
                }
              />
            </ListItem>

            {/* Conversation Area */}
            {conversations.map((convo, index) => (
              <ListItem
                button
                key={convo.id}
                onClick={() => handleItemClick(index)}
                sx={{
                  backgroundColor: activeIndex === index ? '#212121' : 'transparent',
                  '&:hover': {
                    backgroundColor: isMdUp ? '#212121' : activeIndex === index ? '#212121' : 'transparent',
                  },
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <ListItemText
                  primary={convo.title}
                  sx={{
                    color: '#ECECEC',
                    fontSize: '14px',
                    fontWeight: 400,
                  }}
                />
                {activeIndex === index && (
                  <ListItemIcon sx={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
                    <MoreHorizIcon color='primary' />
                  </ListItemIcon>
                )}
              </ListItem>
            ))}
          </List>

          {/* userAccount */}
          <Box onClick={handleClick} sx={{ display: 'flex', alignItems: 'center', py: '8px', px: '14px', marginTop: 'auto', backgroundColor: open ? '#212121' : 'transparent', }}>
            <Avatar alt="User Avatar" src={(user) && user.photoURL} />
            <Box sx={{ marginLeft: 1 }}>
              <Typography variant="body1" color='white'>{(user) && user.displayName}</Typography>
              <Typography variant="body2" color='white'>{(user) && user.email}</Typography>
            </Box>
          </Box>

          {/* menuOfUserAccount */}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <List sx={{ width: 240, bgcolor: '#2F2F2F', border: '1px solid #444343' }}>
              {/* Email at the top */}
              <ListItem>
                <Typography variant="body2" sx={{ color: 'white', py: '8px', px: '2px' }}>{(user) && user.email}</Typography>
              </ListItem>

              <Divider sx={{ bgcolor: '#444343' }} />

              {/* Logout option */}
              <ListItem sx={{
                transform: clicked ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.1s ease',
                '&:hover': {
                  backgroundColor: '#444',
                },
              }}
                button onClick={handleLogOut}>
                <LogoutIcon sx={{ color: 'white', marginRight: 1 }} />
                <ListItemText primary={clicked ? "Logging out..." : "Logout"} sx={{ color: 'white' }} />
              </ListItem>
            </List>
          </Popover>
        </Box>
      </Drawer>
    </>
  );
};

export default Nav;
