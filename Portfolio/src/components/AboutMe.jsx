import React from 'react'
import { Box, Typography, Button, Grid2, IconButton, Card, CardContent } from '@mui/material'
import { Download as DownloadIcon, Work as WorkIcon, CheckCircle as CheckCircleIcon, Help as HelpIcon } from '@mui/icons-material'
import leafImg from '../assets/leaf.svg'
import myImg from '../assets/myImg.jpeg'

const AboutMe = () => {
    return (
        <Box sx={{
            mt: { xs: '80px', lg: '105px' },
        }}>
            {/* About me Heading */}
            <Box>
                <Box sx={{
                    position: 'relative',
                }}>
                    <Typography sx={{
                        color: 'white',
                        fontWeight: 600,
                        fontSize: { xs: '40px', md: '60px' },
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 10
                    }}>About me</Typography>
                    {/* Design Image */}
                    <Box sx={{
                        height: { xs: '32px', md: '50px' },
                        position: 'absolute',
                        top: { xs: '23px', md: '32px' },
                        left: '50%'
                    }}>
                        <img height={'100%'} src={leafImg} alt="Design_Pattern_Img" />
                    </Box>
                </Box>
            </Box>
            {/* About me Part */}
            <Box sx={{
                mt: '3.5rem',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Grid2 container spacing={{ xs: 6, md: 4, lg: 17 }} alignItems="center" justifyContent="center">
                    {/* Left side image */}
                    <Grid2 xs={12} md={6}>
                        <Box sx={{
                            height: { xs: '220px', sm: '350px' },
                            borderRadius: '20px',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={myImg}
                                alt="Owner Image"
                                style={{ height: '100%' }}
                            />
                        </Box>
                    </Grid2>
                    {/* Right side with icons and text */}
                    <Grid2 xs={12} md={6} sx={{
                        width: '500px',
                        height: { md: '350px' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: { xs: 'center', md: 'space-between' },
                        alignItems: { xs: 'center', md: 'flex-start' },
                    }}>
                        <Grid2 container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{
                            px: { xs: '8px', sm: 0 },
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            width: '100%'
                        }}>
                            <Grid2 xs={4}>
                                {/* Card */}
                                <Box sx={{
                                    border: '2px solid white',
                                    bgcolor: 'white',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    width: { xs: '114px', sm: '118px' },
                                    py: 0.5
                                }}>
                                    <IconButton>
                                        <WorkIcon fontSize="large" />
                                    </IconButton>
                                    <Typography variant="h6" sx={{
                                        textAlign: 'center'
                                    }}>Experience</Typography>
                                    <Typography sx={{
                                        textAlign: 'center'
                                    }} variant="body2">Learning</Typography>
                                </Box>
                            </Grid2>

                            <Grid2 xs={4}>
                                {/* Card */}
                                <Box sx={{
                                    bgcolor: 'white',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    width: { xs: '114px', sm: '118px' },
                                    py: 0.5
                                }}>
                                    <IconButton>
                                        <CheckCircleIcon fontSize="large" />
                                    </IconButton>
                                    <Typography variant="h6" sx={{
                                        textAlign: 'center'
                                    }}>Completed</Typography>
                                    <Typography sx={{
                                        textAlign: 'center'
                                    }} variant="body2">12 projects</Typography>
                                </Box>
                            </Grid2>

                            <Grid2 xs={4}>
                                {/* Card */}
                                <Box sx={{
                                    bgcolor: 'white',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    width: { xs: '114px', sm: '118px' },
                                    py: 0.5
                                }}>
                                    <IconButton>
                                        <HelpIcon fontSize="large" />
                                    </IconButton>
                                    <Typography variant="h6" sx={{
                                        textAlign: 'center'
                                    }}>Support</Typography>
                                    <Typography sx={{
                                        textAlign: 'center'
                                    }} variant="body2">24 / 7</Typography>
                                </Box>
                            </Grid2>
                        </Grid2>
                        {/* About Me description */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', sm: 'flex-start' }
                        }}>
                            <Typography variant="body1" component={'p'} sx={{
                                color: 'white',
                                fontSize: '18px',
                                lineHeight: { xs: '25px' },
                                width: { xs: '100%', md: '92%' },
                                textAlign: { xs: 'center', md: 'start' },
                                px: { xs: '10px', sm: 0 },
                                pt: { xs: '32px', md: 0 }
                            }}>
                                I'm a passionate frontend developer with a keen interest in building intuitive, user-friendly web experiences. Currently, I'm focused on expanding my skills in React, working on dynamic and interactive projects.
                            </Typography>
                        </Box>
                        <Box sx={{
                            pt: { xs: '32px', md: 0 }
                        }}>
                            {/* Download CV button */}
                            <Button
                                variant="contained"
                                endIcon={<DownloadIcon />}
                                href="/path-to-your-cv.pdf"
                                download sx={{
                                    fontSize: { xs: '14px', sm: '1rem', md: '1.2rem' },
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '50px',
                                    textTransform: 'capitalize',
                                    border: '2px solid white',
                                    color: 'white',
                                    bgcolor: '#161513',
                                    ":hover": {
                                        borderColor: '#B61BF4'
                                    }
                                }}
                            >
                                Download CV
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    )
}

export default AboutMe