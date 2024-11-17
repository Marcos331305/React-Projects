import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Divider,
    IconButton,
    TextField,
    InputAdornment,
    Box,
    Avatar,
} from '@mui/material';
import { ContentCopy, Close } from '@mui/icons-material';
import WhatsApp from '@mui/icons-material/WhatsApp';
import LinkedIn from '@mui/icons-material/LinkedIn';
import { FaTelegramPlane, FaRedditSquare } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ShareDialog = ({ open, handleClose }) => {
    const [copied, setCopied] = useState(false);
    const conversationId = useSelector((state) => state.conversations.activeConversationId);
    const sharingLink = `http://localhost:5173/talker/share/${conversationId}`; // Example link

    const handleCopyLink = (sharingLink) => {
        setCopied(true);
        navigator.clipboard.writeText(sharingLink);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const handlePlatformsSharing = (label) => {
        const encodedLink = encodeURIComponent(sharingLink);
        switch (label) {
            case 'WhatsApp':
                window.open(`https://wa.me/?text=${encodedLink}`, '_blank');
                break;
            case 'LinkedIn':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedLink}`, '_blank');
                break;
            case 'Telegram':
                window.open(`https://t.me/share/url?url=${encodedLink}`, '_blank');
                break;
            case 'Reddit':
                window.open(`https://www.reddit.com/submit?url=${encodedLink}`, '_blank');
                break;
            default:
                break;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    bgcolor: '#2F2F2F',
                    borderRadius: '16px',
                    padding: '16px',
                    width: '100%',
                    margin: 1,
                },
            }}
            BackdropProps={{
                sx: { bgcolor: '#050505' },
            }}
        >
            {/* Dialog Header */}
            <DialogTitle
                sx={{
                    color: '#F9F9F9',
                    fontWeight: 600,
                    fontSize: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', // Ensures alignment
                    padding: 0,
                    marginBottom: '16px',
                }}
            >
                <Typography
                    component="div"
                    variant="h6"
                    sx={{ color: '#F9F9F9', fontWeight: 'bold' }}
                >
                    Share Conversation
                </Typography>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        color: '#F9F9F9',
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            <Divider sx={{ bgcolor: '#444444', height: '1px', marginBottom: '16px' }} />

            {/* Dialog Content */}
            <DialogContent sx={{ padding: 0, marginBottom: '16px' }}>
                <Typography
                    variant="body1"
                    sx={{ color: '#F9F9F9', marginBottom: '16px' }}
                >
                    Share this conversation link with others:
                </Typography>

                {/* Input Field with Copy Button */}
                <TextField
                    fullWidth
                    variant="outlined"
                    value={sharingLink}
                    InputProps={{
                        readOnly: true,
                        sx: {
                            bgcolor: '#3B3B3B',
                            borderRadius: '50px',
                            color: '#F9F9F9',
                            '& fieldset': {
                                borderColor: '#444444',
                            },
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => handleCopyLink(sharingLink)}
                                    sx={{
                                        bgcolor: copied ? '#4CAF50' : '#444444',
                                        color: '#F9F9F9',
                                        borderRadius: '50px',
                                        padding: '8px 16px', // Adjusts padding for button text
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px', // Space between icon and text
                                        '&:hover': {
                                            bgcolor: copied ? '#388E3C' : '#555555',
                                        },
                                    }}
                                >
                                    <ContentCopy />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#F9F9F9',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {copied ? 'Copied!' : 'Copy'}
                                    </Typography>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>

            {/* Social Media Sharing Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '0px',
                }}
            >
                {[
                    { icon: <WhatsApp sx={{ color: '#25D366', fontSize: 32 }} />, label: 'WhatsApp' },
                    { icon: <LinkedIn sx={{ color: '#0077b5', fontSize: 32 }} />, label: 'LinkedIn' },
                    { icon: <FaTelegramPlane style={{ color: '#0088cc', fontSize: 32 }} />, label: 'Telegram' },
                    { icon: <FaRedditSquare style={{ color: '#FF4500', fontSize: 32 }} />, label: 'Reddit' },
                ].map((item, index) => (
                    <Box
                        key={index}
                        onClick={() => handlePlatformsSharing(item.label)}
                        sx={{
                            textAlign: 'center',
                            cursor: {lg: 'pointer'},
                        }}
                    >
                        <Avatar sx={{ bgcolor: 'transparent', margin: 'auto' }}>
                            {item.icon}
                        </Avatar>
                        <Typography
                            variant="caption"
                            sx={{ color: '#F9F9F9', marginTop: '8px' }}
                        >
                            {item.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Dialog>
    );
};

export default ShareDialog;
