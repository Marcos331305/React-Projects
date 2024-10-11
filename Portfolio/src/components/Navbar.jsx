import React from 'react'
import { useState } from 'react';
import { Box, Container, Grid2, Link, Button } from '@mui/material'
import { useTheme, useMediaQuery } from '@mui/material';
import menuOpenIcon from '../assets/menu_open.svg'
import navUnderline from '../assets/nav_underline.svg'
import { Drawer, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/logo.png'

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('Home');
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickLink = (link) => {
        setActiveLink(link);
    }

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    return (
        <Box sx={{
            py: '12px'
        }}>
            <Container  maxWidth={false} sx={{
                maxWidth: {lg:'lg',xl: '83vw'}
            }} >
                <Grid2 container sx={{
                    border: '2px slid white'
                }}>
                    {/* Left part Logo */}
                    <Grid2 size={{ xs: 6, md: 4 }}>
                        <Box sx={{
                            height: { xs: '35px', md: '52px' }
                        }}>
                            <img src={logo} height={'100%'} alt="" />
                        </Box>
                    </Grid2>
                    {
                        isMobile ? (
                            <>
                                <Grid2 display={'flex'} justifyContent={'flex-end'} alignItems={'center'} size={6}>
                                    <img height={'25px'} onClick={toggleDrawer(true)} src={menuOpenIcon} alt="" />
                                </Grid2>
                                {/* Creating menubar for mobile view */}
                                <Drawer anchor='right' open={open} onClose={toggleDrawer(false)} data-testid="drawer">
                                    <Box sx={{
                                        width: 300,
                                        bgcolor: '#1F0016',
                                        height: '100%'
                                    }} role="presentation" onClick={() => toggleDrawer(false)}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
                                            <Typography variant="h6" sx={{ color: 'white',fontSize: '32px',fontWeight: 500 }}>
                                                Menu
                                            </Typography>
                                            <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
                                                <CloseIcon fontSize='large' />
                                            </IconButton>
                                        </Box>
                                        <List sx={{
                                            pl:'10px'
                                        }}>
                                            {['Home', 'About', 'Skills', 'Services', 'Portfolio', 'Contact'].map((link) => (
                                                <Box key={link} display={'flex'} gap={'20px'} justifyContent={'flex-start'} alignItems={'center'}>
                                                    <ListItem sx={{
                                                        width: '100px',
                                                    }} onClick={() => handleClickLink(link)}>
                                                        <ListItemText primary={link} primaryTypographyProps={{
                                                            sx: {
                                                                color: 'white',
                                                                fontSize: '22px',
                                                                fontFamily: theme.typography.fontFamily,
                                                                fontWeight: '500'
                                                            }
                                                        }} />
                                                    </ListItem>
                                                    {
                                                        activeLink === link && (
                                                            <Box>
                                                                <img height={'12px'} src={navUnderline} alt="Underline-Svg" />
                                                            </Box>
                                                        )
                                                    }
                                                </Box>
                                            ))}
                                        </List>
                                    </Box>
                                </Drawer>
                            </>
                        ) : (
                            <>
                                <Grid2 display={'flex'} justifyContent={'center'} alignItems={'center'} size={4}>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: '35px'
                                    }}>
                                        {
                                            ['Home', 'About', 'Skills', 'Services', 'Portfolio', 'Contact'].map((link) => (
                                                <Box display={'flex'} key={link} justifyContent={'center'} flexDirection={'column'}>
                                                    <Link underline='none' sx={{
                                                        fontFamily: theme.typography.fontFamily,
                                                        fontSize: '18px',
                                                        fontWeight: 700,
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                    }} onClick={() => handleClickLink(link)}>{link}</Link>
                                                    {
                                                        activeLink === link && (
                                                            <img height={'12px'} src={navUnderline} alt="Underline-Svg" />
                                                        )
                                                    }
                                                </Box>
                                            )
                                            )
                                        }
                                    </Box>
                                </Grid2>
                                {/* Right part connectButton */}
                                <Grid2 display={'flex'} justifyContent={'flex-end'} alignItems={'center'} size={4}>
                                    <Button sx={{
                                        background: 'linear-gradient(264deg, #DF8908 -5.09%, #B415FF 106.28%)',
                                        fontFamily: theme.typography.fontFamily,
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        textTransform: 'capitalize',
                                        py: '10px',
                                        px: '25px',
                                        borderRadius: '50px',
                                        ":hover":{
                                            border: '1px solid white'
                                        }
                                    }} variant="contained">connect with me</Button>
                                </Grid2>
                            </>
                        )
                    }
                </Grid2>
            </Container>
        </Box >
    )
}

export default Navbar