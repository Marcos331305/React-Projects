import React from 'react'
import { Box, Container, Typography, Button, Grid2, Avatar } from '@mui/material'
import myImg from '../assets/myImg.jpeg'

const typewriterVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
        width: 'auto',
        opacity: 1,
        transition: {
            duration: 1.5,
            ease: 'easeInOut',
        },
    },
};

const HeroSection = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            pt: {xs: '3.5rem',md: '3rem'}
        }}>
            <Container maxWidth={false}>
                <Grid2 container spacing={3} justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>

                    {/* Profile Image */}
                    <Grid2 xs={12}>
                        <Avatar
                            alt="Ravikant Jangir"
                            src={myImg}
                            sx={{
                                width: {xs: '200px',md: '240px'},
                                height: {xs: '200px',md: '240px'},
                                mx: 'auto', // centers the image horizontally
                                borderRadius: '50%',
                            }}
                        />
                    </Grid2>

                    {/* Intro Text */}
                    <Grid2 xs={12} sx={{
                        mt: {xs: '-13px',lg: '5px'}
                    }}>
                        <Typography variant="h2" sx={{
                            mx: 'auto',
                            width: {xs:'100%',md:'88%',xl: '75%'},
                            lineHeight: {xs: '0.7',md: '70px'}
                        }}>
                            <Typography
                                component="span" variants={typewriterVariants}
                                sx={{
                                    background: 'linear-gradient(270deg, #DF8908, #B415FF)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '35px', md: '65px' },
                                    fontWeight: 700,
                                    lineHeight: {xs: '0',xl: '70px'}
                                }}
                            >
                                I'm Ravikant Jangir,
                            </Typography>
                            <Typography variants={typewriterVariants} sx={{
                                color: 'white',
                                fontSize: { xs: '35px', md: '65px' },
                                fontWeight: 700,
                                lineHeight: {xs: '0',xl: '70px'}
                            }} component={'span'}> frontend developer based in INDIA.</Typography>
                        </Typography>
                        <Typography variant="body1" sx={{
                            mt: {xs: '22px',sm:2},
                            fontSize: { xs: '1rem', md: '22px' },
                            color: 'white',
                            width: {xs: '100%',md:'82%',lg: '60%'},
                            mx: 'auto',
                            lineHeight: {xs: '22px',sm: '30px'}
                        }}>
                            I am a Frontend Developer from New Delhi, INDIA. Passionate about crafting responsive, interactive, and visually appealing web experiences.
                        </Typography>
                    </Grid2>

                    {/* Buttons */}
                    <Grid2 xs={12}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', // centers buttons
                            gap: 2,
                            mt: {sm:1}
                        }}>
                            <Button
                                variant="contained"
                                sx={{
                                    background: 'linear-gradient(264deg, #DF8908 -5.09%, #B415FF 106.28%)',
                                    fontSize: { xs: '14px', sm: '1rem', md: '1.2rem' },
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '50px',
                                    textTransform: 'capitalize',
                                    ":hover":{
                                        border: {sm: '2px solid white'}
                                    }
                                }}
                            >
                                Connect with me
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    fontSize: { xs: '14px', sm: '1rem', md: '1.2rem' },
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '50px',
                                    textTransform: 'capitalize',
                                    border: '2px solid white',
                                    color: 'white',
                                    ":hover":{
                                        borderColor: '#B61BF4'
                                    }
                                }}
                            >
                                My Resume
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    )
}

export default HeroSection