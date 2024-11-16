import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Divider,
    TextField,
    InputAdornment,
    Box,
    Avatar,
} from '@mui/material';
import { Close, ContentCopy, WhatsApp, LinkedIn } from '@mui/icons-material';
import { FaTelegramPlane, FaRedditSquare } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ShareDialog = ({ open, handleClose }) => {
    const [copied, setCopied] = useState(false);
    const conversationId = useSelector((state) => state.conversations.activeConversationId);
    const sharingLink = `http://localhost:5173/talker/share/${conversationId}`;

    const handleCopyLink = (sharingLink) => {
        setCopied(true);
        // sharingLink to clipBoard
        navigator.clipboard.writeText(sharingLink);
        // Simulate a short delay to reset the state
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    const handlePlatformsSharing = (label) => {
        const encodedLink = encodeURIComponent(sharingLink);
        // Handle the click event for each icon based on the label
        switch (label) {
            case 'WhatsApp':
                window.open(`https://wa.me/?text=${encodedLink}`, '_blank'); // Open WhatsApp link
                break;
            case 'LinkedIn':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedLink}`, '_blank'); // Open LinkedIn
                break;
            case 'Telegram':
                window.open(`https://t.me/share/url?url=${encodedLink}&text=Check%20out%20my%20paste!`, '_blank'); // Open Telegram
                break;
            case 'Reddit':
                window.open(`https://www.reddit.com/submit?url=${encodedLink}`, '_blank'); // Open Reddit
                break;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: 3, // Rounded corners
                    margin: 1, // Reduce margins on smaller screens
                    width: '100%', // Ensures full width within the container
                    maxWidth: '600px', // Maintain a maximum width
                    boxSizing: 'border-box', // Prevent content overflow
                },
            }}
            BackdropProps={{
                sx: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)'
                }
            }}
        >
            {/* Dialog Header */}
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: '20px', px: '16px' }}>
                <Typography variant="h6">Share Conversation</Typography>
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <Divider sx={{ borderColor: '#C4C4C4' }} />

            {/* Dialog Content */}
            <DialogContent sx={{
                padding: '16px'
            }}>
                <Typography variant="body1" sx={{ marginBottom: '12px' }}>
                    Share this conversation link with others :
                </Typography>

                {/* Input Field with Copy Button */}
                <TextField
                    fullWidth
                    variant="outlined"
                    value={sharingLink} // Example link
                    InputProps={{
                        sx: {
                            borderRadius: 50, // Fully rounded corners
                            paddingRight: 0,
                        },
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment sx={{
                                mr: 1,
                            }} position="end">
                                <IconButton
                                    onClick={() => handleCopyLink(sharingLink)}
                                    sx={{
                                        borderRadius: 50,
                                        color: copied ? 'white' : 'primary.main',
                                        bgcolor: copied ? 'success.light' : '#7D7D7D',
                                        '&:hover': {
                                            bgcolor: copied ? 'success.dark' : 'primary.dark',
                                        },
                                    }}
                                >
                                    <ContentCopy />
                                    <Typography sx={{
                                        color: copied ? 'white' : ''
                                    }} variant="body2">
                                        {copied ? 'Copied!' : 'Copy'}
                                    </Typography>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Social Media Icons Section */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        textAlign: 'center',
                        marginTop: '12px'
                    }}
                >
                    {[
                        { icon: <WhatsApp sx={{ color: '#25D366', fontSize: 32 }} />, label: 'WhatsApp' },
                        { icon: <LinkedIn sx={{ color: '#0077b5', fontSize: 32 }} />, label: 'LinkedIn' },
                        { icon: <FaTelegramPlane style={{ color: '#0088cc', fontSize: 32 }} />, label: 'Telegram' },
                        { icon: <FaRedditSquare style={{ color: '#FF4500', fontSize: 32 }} />, label: 'Reddit' }
                    ].map((item, index) => (
                        <Box key={index} onClick={() => handlePlatformsSharing(item.label)}>
                            <Avatar sx={{ bgcolor: 'transparent', margin: 'auto' }}>{item.icon}</Avatar>
                            <Typography
                                variant="caption"
                                sx={{ color: 'text.secondary', marginTop: 1 }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ShareDialog;
