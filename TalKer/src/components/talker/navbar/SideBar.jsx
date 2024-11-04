import React from 'react'
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Box,
    Popover,
    Divider,
    Toolbar,
    IconButton,
    Typography
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthState } from '../../../features/authSlice';
import { useState, useEffect } from 'react';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const SideBar = ({ isOpen, handleConBar }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [user, setUser] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // fetch conversationsState from the conversationsSlice to use in sideBars ui
    const conversations = useSelector((state) => state.conversations.conversations);

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
        setTimeout(async () => {
            await signOut(auth);
            dispatch(setAuthState()); // set the userAuthenticated state to false first that have using in authSlice
            navigate('/'); // Redirect the user to Home-Page(loginPage)
        }, 1000); // Duration of the logOut process
    };

    return (
        <>
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
                                key={convo.conversation_id}
                                onClick={() => handleItemClick(index)}
                                sx={{
                                    backgroundColor: activeIndex === index ? '#212121' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: isMdUp ? '#212121' : activeIndex === index ? '#212121' : 'transparent',
                                    },
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center', // Ensures the text and icon align properly
                                }}
                            >
                                <ListItemText
                                    primary={convo.title}
                                    sx={{
                                        color: '#ECECEC',
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        maxWidth: activeIndex === index ? 'calc(100% - 40px)' : '100%', // Adjusts the space for the icon
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
    )
}

export default SideBar