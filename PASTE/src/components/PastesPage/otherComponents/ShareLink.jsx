import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    TextField,
    Button,
    IconButton,
    Box,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import toast from 'react-hot-toast'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const ShareLink = ({ open, onClose, sharingLink }) => {
    return (
        <Dialog open={open} TransitionComponent={Transition} onClose={onClose} fullWidth maxWidth="sm" sx={{
            '& .MuiDialog-paper': {
                backgroundColor: '#0F0F0F',
                color: 'white',
                border: '1px solid #1D283A',
                borderRadius: '7px'
            }
        }}>
            <DialogTitle>
                <Typography variant="h6" component="span">
                    Share Link
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon sx={{ color: 'white' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography color='#7F8DA3' variant="body2" gutterBottom>
                    Anyone who has this link will be able to view this paste.
                </Typography>
                <Box sx={{
                    marginBottom: '-20px'
                }}>
                    <TextField
                        value={sharingLink}
                        fullWidth
                        sx={{
                            border: '1px solid #1D283A',
                            outline: 'none',
                            borderRadius: '6px',
                            marginTop: '15px',
                            bgcolor: '#030712',
                        }}
                        InputProps={{
                            readOnly: true,
                            style: {
                                color: 'white'
                            }
                        }}
                        style={{ marginBottom: '16px' }} // Add some margin below the text field
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ marginBottom: '7px', mr: '5px' }}>
                <Button variant="contained" sx={{ bgcolor: '#030712', border: '1px solid #1D283A' }} onClick={() => { 
                    navigator.clipboard.writeText(sharingLink)
                    toast.success('Paste-Link Copied Successfully')
                 }}>
                    Copy Link
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ShareLink
