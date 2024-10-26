import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Mailverification = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/');
    };
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh" // Make the Box take full height of the viewport
            bgcolor="background.default" // Use the default background color
        >
            <Card variant="outlined">
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        Your email has been verified
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        You can now sign in with your new account
                    </Typography>
                    <Button onClick={handleLogin} variant="contained" color="primary" sx={{ marginTop: 4 }}>
                        Click to Login
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Mailverification;

