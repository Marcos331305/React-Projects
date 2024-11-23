import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Typography,
    TextField,
    Button,
    IconButton,
} from '@mui/material';

const RenameDialog = ({ open, onClose, handleRename, handleEditableTitle, activeConversationTitle }) => {
    return (
        <Dialog
            open={open}
            onClose={onclose}
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
                    Rename Conversation?
                </Typography>
            </DialogTitle>

            <Divider sx={{ bgcolor: '#444444', height: '1px', marginBottom: '16px' }} />

            {/* Dialog Content */}
            <DialogContent sx={{ padding: 0, marginBottom: '16px' }}>
                <Typography
                    variant="body1"
                    sx={{ color: '#F9F9F9', marginBottom: '16px' }}
                >
                    Please enter a new name for this conversation :
                </Typography>

                {/* Input Field with Copy Button */}
                <TextField
                    fullWidth
                    variant="outlined"
                    value={activeConversationTitle || ''}
                    onChange={(e) => handleEditableTitle(e)}
                    InputProps={{
                        sx: {
                            backgroundColor: '#404040',
                            borderRadius: '8px',
                            color: 'white',
                        },
                    }}
                    inputProps={{
                        style: { color: 'white' },
                    }}
                />

            </DialogContent>

            {/* Actions */}
            <DialogActions sx={{ justifyContent: 'flex-end', padding: '16px', pb: 0, pt: '10px' }}>
                <Button
                    onClick={onClose}
                    sx={{
                        backgroundColor: '#505050',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#606060' },
                        mr: 1
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleRename}
                    sx={{
                        backgroundColor: '#1DB954',
                        color: 'white',
                        textTransform: 'none',
                        marginLeft: '8px',
                        '&:hover': { backgroundColor: '#1AAE49' },
                    }}
                >
                    Rename
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RenameDialog;
