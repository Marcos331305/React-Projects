import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Divider,
    Button,
    Box,
} from '@mui/material';

const DeleteDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    bgcolor: '#2F2F2F',
                    borderRadius: '16px',
                    padding: '16px',
                    width: '100%',
                    maxWidth: '400px', // Restricts the dialog box width
                    margin: 1,
                },
            }}
            BackdropProps={{
                sx: {
                    bgcolor: '#010101',
                },
            }}
        >
            {/* Dialog Title */}
            <DialogTitle
                sx={{
                    color: '#F9F9F9',
                    fontWeight: 600,
                    fontSize: '18px',
                    padding: 0,
                    marginBottom: '16px',
                }}
            >
                Delete chat?
            </DialogTitle>

            <Divider sx={{ bgcolor: '#444444', height: '1px', marginBottom: '16px' }} />

            {/* Dialog Content */}
            <DialogContent sx={{ padding: 0, marginBottom: '16px' }}>
                <Typography variant="body1" sx={{ color: '#F9F9F9', fontSize: '14px' }}>
                    Are you sure you want to delete this conversation? This action cannot be undone.
                </Typography>
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions
                sx={{
                    padding: 0,
                    flexDirection: 'column',
                    gap: 1, // Adds spacing between buttons
                }}
            >
                <Button
                    onClick={onConfirm}
                    fullWidth
                    variant="contained"
                    sx={{
                        bgcolor: '#EF4444',
                        color: '#F9F9F9',
                        borderRadius: '50px',
                        width: '100%', // Ensures button fills width
                        '&:hover': {
                            bgcolor: '#DC2626',
                        },
                    }}
                >
                    Delete
                </Button>

                <Button
                    onClick={onClose}
                    fullWidth
                    variant="outlined"
                    sx={{
                        color: '#F9F9F9',
                        borderColor: '#4E4E4E',
                        borderRadius: '50px',
                        ml: '0px !important',
                        width: '100%', // Ensures button fills width
                        '&:hover': {
                            bgcolor: '#3B3B3B',
                            borderColor: '#4E4E4E',
                        },
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;
