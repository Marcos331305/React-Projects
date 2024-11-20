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
import { clearActiveConversationId, delConversation, delConversationFromSupabase, setActiveConversationId, setActiveIndex } from '../../../features/conversationsSlice';
import { clearMessages, delMessages, fetchMessages } from '../../../features/messageSlice';
import { Share, Edit, Delete } from '@mui/icons-material';
import ShareDialog from './ShareDialog';
import DeleteDialog from './DeleteDialog';

const SideBar = ({ isOpen, handleConBar }) => {
    const [user, setUser] = useState(null);
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [shareDialogOpen, setShareDialogOpen] = useState(false); // for shareOption
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // for deleteOption
    const [anchorEl, setAnchorEl] = useState(null); // for userMenu
    const [anchorElMore, setAnchorElMore] = useState(null); // for moreIcon
    const activeConversationId = useSelector((state) => state.conversations.activeConversationId);
    const activeIndex = useSelector((state) => state.conversations.activeIndex);
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
    // useEffect for persisted active Conversation Highlighting :->
    // Effect to set the activeIndex based on activeConversationId
    useEffect(() => {
        const activeConversation = conversations.find(
            (convo) => convo.conversation_id === activeConversationId
        );
        if (activeConversation) {
            const index = conversations.indexOf(activeConversation);
            dispatch(setActiveIndex(index));
        }
    }, [activeConversationId, conversations, dispatch]);

    // Check if screen size is medium or larger
    const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const handleItemClick = (index, convoId) => {
        // Check if the clicked conversation is already the active one
        if (convoId !== activeConversationId) {
            // First, set the active conversation ID and index
            dispatch(setActiveConversationId(convoId));
            dispatch(setActiveIndex(index));

            // Then, fetch the messages for the selected conversation
            dispatch(fetchMessages(convoId));

            // Finally, navigate to the selected conversation route
            navigate(`/talker/c/${convoId}`);

            // Close the sidebar only if the conversation is different
            handleConBar();
        }
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
            dispatch(clearActiveConversationId());
            navigate('/'); // Redirect the user to Home-Page(loginPage)
        }, 1000); // Duration of the logOut process
    };

    const handleNewConversation = () => {
        if (activeConversationId !== null) {
            console.log('triggered ->>>')
            dispatch(setActiveIndex(null));
            dispatch(clearActiveConversationId());
            dispatch(clearMessages()); // Clear previous messages
            navigate('/talker');
            handleConBar();
        }
    };

    // moreOptions Handling
    const handleClickMore = (event) => {
        setAnchorElMore(event.currentTarget); // Open Popover when More icon is clicked
    };

    const handleCloseMore = () => {
        setAnchorElMore(null); // Close Popover when clicked outside
    };

    const handleOpenShareDialog = () => {
        setShareDialogOpen(true);
        handleCloseMore();
    };

    const handleCloseShareDialog = () => {
        setShareDialogOpen(false);
    };

    const handleRename = () => {
        console.log('Rename option clicked');
        handleCloseMore();
    };

    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true);
        handleCloseMore();
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        handleCloseMore();
    };

    const handleConfirmDelete = () => {
        setDeleteDialogOpen(false);
        handleConBar();
        dispatch(setActiveIndex(null));
        dispatch(clearMessages());
        dispatch(delConversation({ activeConversationId }));
        dispatch(delConversationFromSupabase(activeConversationId));
        dispatch(clearActiveConversationId());
        navigate('/talker');
    };

    const openMore = Boolean(anchorElMore);

    return (
        <>
            <Drawer anchor="left" open={isOpen} onClose={handleConBar}>
                <Box sx={{ width: 257, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#171717', overflow: 'hidden' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: '6px' }}>
                        <IconButton onClick={handleConBar}>
                            <MenuOpenIcon color='primary' />
                        </IconButton>
                        <IconButton onClick={handleNewConversation}>
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
                                key={convo.conversation_id || index}
                                onClick={() => handleItemClick(index, convo.conversation_id)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    py: activeIndex === index ? '0px' : '8px',
                                    px: '12px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        backgroundColor: activeIndex === index ? '#212121' : 'transparent', // Apply bg color to text and icon area
                                        borderRadius: '8px', // Optional border radius for the background effect

                                        transition: 'background-color 0.3s ease', // Smooth transition for background color
                                    }}
                                >
                                    <ListItemText
                                        primary={convo.title}
                                        sx={{
                                            mr: '5px',
                                            maxWidth: activeIndex === index ? 'calc(100% - 40px)' : '100%',
                                            px: 1,
                                            my: 0,
                                        }}
                                        primaryTypographyProps={{
                                            sx: {
                                                fontSize: '14px',
                                                color: '#ECECEC',
                                                fontWeight: 400,
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            },
                                        }}
                                    />
                                    {activeIndex === index && (
                                        <ListItemIcon sx={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>
                                            <IconButton onClick={handleClickMore}>
                                                <MoreHorizIcon color='primary' />
                                            </IconButton>
                                        </ListItemIcon>
                                    )}
                                </Box>
                            </ListItem>
                        ))}
                    </List>

                    {/* moreOptions Menu */}
                    <Popover
                        open={openMore}
                        anchorEl={anchorElMore}
                        onClose={handleCloseMore}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        sx={{
                            '& .MuiPaper-root': {
                                borderRadius: '16px',
                            },
                        }}
                    >
                        <List sx={{ width: 125, bgcolor: '#2F2F2F' }}>
                            <ListItem onClick={handleOpenShareDialog}>
                                <Share fontSize='small' sx={{ color: 'white', marginRight: 1 }} />
                                <ListItemText primary="Share" sx={{
                                    color: 'white',
                                    '& .MuiTypography-root': {
                                        fontSize: '14px',
                                    },
                                }} />
                            </ListItem>
                            <ListItem onClick={handleRename}>
                                <Edit fontSize='small' sx={{ color: 'white', marginRight: 1 }} />
                                <ListItemText primary="Rename" sx={{
                                    color: 'white',
                                    '& .MuiTypography-root': {
                                        fontSize: '14px',
                                    },
                                }} />
                            </ListItem>
                            <ListItem onClick={handleOpenDeleteDialog}>
                                <Delete fontSize='small' sx={{ color: '#F93A37', marginRight: 1 }} />
                                <ListItemText primary="Delete" sx={{
                                    color: '#F93A37',
                                    '& .MuiTypography-root': {
                                        fontSize: '14px',
                                    },
                                }} />
                            </ListItem>
                        </List>
                    </Popover>

                    {/* moreOption Dialog's */}
                    {/* shareDialog */}
                    <ShareDialog open={shareDialogOpen} handleClose={handleCloseShareDialog} />

                    {/* userAccount section */}
                    <Box onClick={handleClick} sx={{ display: 'flex', alignItems: 'center', py: '8px', px: '14px', marginTop: 'auto', backgroundColor: open ? '#212121' : 'transparent', }}>
                        <Avatar alt="User Avatar" src={(user) && user.photoURL} />
                        <Box sx={{ marginLeft: 1 }}>
                            <Typography variant="body1" color='white'>{(user) && user.displayName}</Typography>
                            <Typography variant="body2" color='white'>{(user) && user.email}</Typography>
                        </Box>
                    </Box>
                    {/* deleteDialog */}
                    <DeleteDialog
                        open={deleteDialogOpen}
                        onClose={handleCloseDeleteDialog}
                        onConfirm={handleConfirmDelete}
                    />


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